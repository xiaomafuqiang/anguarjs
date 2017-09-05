const gulp = require('gulp');
const bs = require('browser-sync');
const less = require('gulp-less');


gulp.task('server', function(){
    bs.init({
        server: {
            baseDir: './public',
            index: 'index.html'
        }
    })
})

gulp.task('less', function(){
    gulp.src('./public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
})

gulp.task('watch', function(){
    
    gulp.watch('./public/*.html').on('change', bs.reload);
    gulp.watch('./public/less/*.less', ['less']).on('change', bs.reload);

})


gulp.task('default', ['less', 'server', 'watch']);