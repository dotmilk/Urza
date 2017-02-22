var gulp = require('gulp')
var concat = require('gulp-concat')


gulp.task('build', () => {
    return gulp.src(['app.min.js','UrStateMachine.js','main.js','UrPageManager.js','UrPage.js'])
        .pipe(concat('urza.js'))
        .pipe(gulp.dest('./'))
})
gulp.task('watch', () => {
    gulp.watch('*.js',['build'])

})
