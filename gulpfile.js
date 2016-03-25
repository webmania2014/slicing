
var gulp = require('gulp');

// Define sass, minifycss, rename, ...
var sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    sourcemaps = require('gulp-sourcemaps'),
    open = require('gulp-open'),
    connect = require('gulp-connect');


/*livereload.options.port = '8080';*/

var paths = {
    styles: {
        globalLoad: [
            'bower_components/bootstrap-sass/assets/stylesheets',
            'assets/scss/partials'
        ],
        srcFile: 'assets/scss/main.scss',
        dstPath: 'assets/css/'
    }
};
var displayError = function (error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n", ''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if (error.fileName)
        errorString += ' in ' + error.fileName;

    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};


// Define task for build scss
gulp.task('style', function () {
    return sass('assets/scss/', {
            style: 'compressed',
            compass: true,
            /*sourcemap: true,*/
            loadPath: paths['styles'].globalLoad
        })       
        .on('error', displayError)
        /*.pipe(sourcemaps.write('assets/css', {
            includeContent: false,
            sourceRoot: 'assets/scss/'
        }))*/
        .pipe(rename({basename: 'brightergy', suffix: '.min'}))
        .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
        /*.pipe(minifycss())*/
        .pipe(gulp.dest(paths['styles'].dstPath))
        .pipe(connect.reload());
});

// Define html replace task
gulp.task('html', function() {
    return gulp.src(['src/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

// Define watch task
gulp.task('watch', function () {
    function log(evt) {
        console.log('[Watcher] File %s was %s, compiling...', evt.path.replace(/.*(?=sass)/,''), evt.type);
    }
    /*livereload.listen();*/
    gulp.watch('assets/scss/**/*.scss', ['style']).on('change', log);
    gulp.watch('src/**/*.html', ['html']).on('change', log);
});

gulp.task('openUrl', function(){

  var options = {
    url: 'http://localhost:8080',
    app: 'chrome'
  };

  gulp.src('./index.html')
  .pipe(open('', options));

});

gulp.task('build', ['html', 'style']);

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});
 
gulp.task('default', ['build', 'webserver', 'watch', 'openUrl']);