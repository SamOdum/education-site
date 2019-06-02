// Load plugins
const autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync').create(),
    cssnano = require('cssnano'),
    flatten = require('gulp-flatten'),
    header = require('gulp-header'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    tap = require('gulp-tap'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    webpackconfig = require('./webpack.config.js'),
    webpackstream = require('webpack-stream'),
    reload = browsersync.reload,
    package = require('./package.json'),
    fileversion = `.${package.version}`;

// Project paths
let path = {
    build: {
        html: './app/build/',
        js: './app/build/js/',
        css: './app/build/css/',
        img: './app/build/img/',
        svg: './app/build/img/icon/'
    },
    src: {
        html: 'app/*.html',
        js: 'app/src/js/main.js',
        style: 'app/src/style/main.sass',
        img: 'app/src/img/**/*.*',
        svg: 'app/src/img/icon/*.svg'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/src/js/**/*.js',
        style: 'app/src/style/**/*.sass',
        img: 'app/src/img/**/*.*',
        icon: 'app/src/img/icon/*.*'
    },
    clean: './app/build'
};


// Banner template
const banner = {
	full:[
		'/*!' +
		' * <%= package.name %> v<%= package.version %>' +
		' * <%= package.description %>' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' * <%= package.license %> License' +
		' * <%= package.repository.url %>' +
		' */\n'].join('\n'),
	min:[
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'].join(' ')
};
// const banner = ['/**',
//   ' * <%= package.name %> - <%= package.description %>',
//   ' * @version v<%= package.version %>',
//   ' * @link <%= package.homepage %>',
//   ' * @license <%= package.license %>',
//   ' */',
//   ''].join('\n');

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './app'
        },
    });
    done();
}

// Clean build
function clean() {
    return del(path.clean);
}

// Optimize Images
function images(done) {
    gulp.src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{
                        removeViewBox: false,
                        collapseGroups: true
                    }]
                })
            ])
        )
        .pipe(gulp.dest(path.build.img));
    done();
}

// HTML
function html(done) {
    gulp.watch(path.watch.html, gulp.series(reload));
    done();
}

// CSS task
function style(done) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'expanded',
            sourceComments: true
        }))
        .on('error', console.error.bind(console))
        .pipe(flatten())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true,
            remove: true
        }))
        .pipe(header(banner.full, { package : package }))
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({
            suffix: '.min' + fileversion
        }))
        // .pipe(cssnano({ discardComments: {
        //     removeAll: true
        // }}))
        .pipe(header(banner.min, {package:package}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream());
    done();
}

// SVG sprites
function sprites(done) {
	gulp.src(path.src.svg)
		.pipe(plumber())
		.pipe(tap(function (file, t) {
        var name = file.relative + '.svg';
        return gulp.src(file.path + '/*.svg')
            .pipe(svgmin())
            .pipe(svgstore({
                fileName: name,
                prefix: 'icon-',
                inlineSvg: true
            }))
            .pipe(gulp.dest(path.build.svg));
		}))
		.pipe(svgmin())
		.pipe(gulp.dest(path.build.svg));
    done();
}

// Lint scripts
function scriptsLint(done) {
    gulp.src([path.watch.js, "./gulpfile.js"])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    done();
}

// Transpile, concatenate and minify scripts
function scripts(done) {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(webpackstream(webpackconfig, webpack))
        // folder only, filename is specified in webpack config
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream());
    done();
}

// Watch files
function watchFiles(done) {
    gulp.watch(path.watch.html, gulp.series(html));
    gulp.watch(path.watch.style, gulp.series(style));
    gulp.watch(path.watch.js, gulp.series(scriptsLint, scripts));
    gulp.watch(path.watch.img, gulp.series(images));
    gulp.watch(path.watch.icon, gulp.series(sprites));
    done();
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(style, images, sprites, js));
const watch = gulp.series(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.html = html;
exports.style = style;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;