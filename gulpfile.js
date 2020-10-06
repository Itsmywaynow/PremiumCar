const gulp = require('gulp');
const sass = require('gulp-sass');
const browsync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function style() { // конвертирует scss в css
    return gulp.src('./scss/**/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('./css'))
                .pipe(browsync.stream())
}

function watch() { // следит за  изменениями в файле и автоматически выполняет его конвертацию
    browsync.init({
        server: {
            baseDir: './'  // корневая директория
        }
    })
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browsync.reload); //если меняется файл html,выполнить команду reload
}

exports.default = () => (
    gulp.src('./scss/**/*.scss')
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(gulp.dest('dist'))
);

exports.style = style;  // вызов функции конвертации
exports.watch = watch; // отслеживание за изменениями файла и автовыполнение функции style