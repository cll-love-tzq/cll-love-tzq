// for gulp4

//import modules
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const scss = require('gulp-sass');
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create(),
reload = browserSync.reload;

// Compile SCSS
gulp.task('scss',()=>{
    return gulp.src('./scss/*.scss')
    .pipe(plumber())
    .pipe(scss())
    .pipe(gulp.dest('./css'));
})

gulp.task('es6',()=>{
    return gulp.src('./es6/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./js'));
})

gulp.task('scss:watch',()=>{
    gulp.watch('./scss/*',gulp.series('scss'))
})
gulp.task('es6:watch',()=>{
    gulp.watch('./es6/*',gulp.series('es6'))
})
gulp.task('start',gulp.parallel('scss','es6',()=>{
    browserSync.init({
        server: ""
    });
    gulp.watch('./scss/*',gulp.series('scss'))
    gulp.watch('./es6/*',gulp.series('es6'))
    gulp.watch('./css/*').on('change', reload);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('./js/*').on('change', reload);
}))

gulp.task('default',gulp.series('start'))