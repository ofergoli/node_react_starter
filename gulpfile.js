// Load some modules which are installed through NPM.
var gulp = require('gulp');
var open = require('gulp-open');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');  // To compile Stylus CSS.
var spawn = require('child_process').spawn,node;

// Define some paths.
var paths = {
  styl: ['src/css/**/*.styl'],
  css: ['src/css/**/*.css'],
  img: ['src/images/**/*'],
  app_js: ['./src/js/app.js'],
  js: ['src/js/**/*.js','src/js/*.js']
};

// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that
// they're done.
gulp.task('clean', function(done) {
  del(['build'], done);
});
 
// Our CSS task. It finds all our Stylus files and compiles them.
gulp.task('css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});
 
// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js/'));
});
 
gulp.task('copy', function() {
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/images/*').pipe(gulp.dest('dist/images'));
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});
 
gulp.task('open', function(){
  gulp.src('./dist/index.html').pipe(open());
});

gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});
 
/**
 * $ gulp
 * description: start the development environment
 */
// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['copy','watch', 'css', 'js','server']);