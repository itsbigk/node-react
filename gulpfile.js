const gulp       = require('gulp'),
      webpack    = require('gulp-webpack'),
      sass       = require('gulp-sass'),
      rename     = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      nodemon    = require('gulp-nodemon'),
      path       = require('path');

const paths = {
  sass: ['./src/sass/**/*.scss'],
  react: ['./src/**/*.js', './src/**/*.jsx'],
  sassSrc: path.join(__dirname, 'src/sass')
}

gulp.task('webpack', () => {
  return gulp.src('./src/App.jsx')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.',
            { sourceRoot: paths.sassSrc }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public'));
});


gulp.task('watch', () => {
  gulp.watch(paths.react, ['webpack']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('nodemon', () => {
  nodemon({
    script: './server.js',
    ext: 'js jsx scss html'
  })
    .on('start', ['webpack', 'watch'])
    .on('change', ['watch'])
    .on('restart', () => {
      console.log('Restarted');
    });
});

gulp.task('default', ['nodemon']);
