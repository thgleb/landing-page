var gulp = require("gulp");
var plumber = require("gulp-plumber");
var coffee = require("gulp-coffee");
var concat = require("gulp-concat");
var include = require("gulp-include");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var watch = require("gulp-watch");
var html = require("gulp-minify-html");
var browserSync = require("browser-sync");

function run(task) {
  return function() {
    gulp.start(task);
  };
};

function arg(key) {
  var index = process.argv.indexOf(key);
  var next = process.argv[index + 1];

  if (index < 0) {
    return null;
  };

  return (!next || next[0] === "-") ? true : next;
};

gulp.task("scripts", function() {
  gulp.src("./source/cs/build.coffee")
      .pipe(plumber())
      .pipe(include())
      .pipe(coffee())
      .pipe(concat("build.js"))
      .pipe(uglify())
      .pipe(gulp.dest("./dist/assets/js"));
});

gulp.task("styles", function() {
  gulp.src("./source/sass/build.scss")
      .pipe(plumber())
      .pipe(sass({
        includePaths: ["source/sass"],
        outputStyle: "compressed"
      }))
      .pipe(concat("build.css"))
      .pipe(gulp.dest("./dist/assets/styles"));
});

gulp.task("html", function() {
  gulp.src("./source/html/**/*.html")
      .pipe(plumber())
      .pipe(html())
      .pipe(gulp.dest("./dist"));
});

gulp.task("images", function() {
  gulp.src("./source/images/**/*.*")
      .pipe(plumber())
      .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task("fonts", function() {
  gulp.src("./source/fonts/**/*.*")
      .pipe(plumber())
      .pipe(gulp.dest("./dist/assets/fonts"));
});

gulp.task("watch", function() {
  var options = {
    read: false
  };

  watch("source/cs/**/*.*", options, run("scripts"));
  watch("source/scss/**/*.*", options, run("styles"));
  watch("source/html/**/*.*", options, run("html"));
  watch("source/images/**/*.*", options, run("images"));
  watch("source/fonts/**/*.*", options, run("fonts"));
});

gulp.task("live", function() {
  run("default")();
  run("watch")();

  var browser = arg("--no-browser") || "default";

  browserSync({
    server: { baseDir: "./dist" },
    notify: false,
    browser: browser
  });

  watch("./dist/**/*.*", { read: false }, function() {
    browserSync.reload();
  });
});

gulp.task("default", function() {
  run("fonts")();
  run("images")();
  run("html")();
  run("styles")();
  run("scripts")();
});