/*eslint no-undef: 0*/

var gulp      = require('gulp')
  , mocha     = require('gulp-mocha')
  , util      = require('gulp-util')
  , istanbul  = require('gulp-istanbul')
  , eslint    = require('gulp-eslint')

gulp.task('pre-test', function () {
  return gulp.src(['index.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['lint', 'pre-test'], function () {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({reporters: ['lcov', 'text-summary', 'html']}))
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
    .on('error', util.log)
})

gulp.task('watch-test', function () {
  gulp.watch(['index.js', 'test/**'], ['test'])
})

gulp.task('lint', function () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js', '!node_modules/**','!coverage/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({configFile: 'eslint.json'}))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
})

gulp.task('default', ['watch-test'], function () {
  // This will only run if the lint task is successful...
})
