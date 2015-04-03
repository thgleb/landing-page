var fs = require("fs");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var coffee = require("gulp-coffee");
var concat = require("gulp-concat");
var include = require("gulp-include");
var uglify = require("gulp-uglify");
var sass = require("gulp-ruby-sass");
var watch = require("gulp-watch");
var html = require("gulp-minify-html");
var browserSync = require("browser-sync");
var image = require("gulp-imagemin");

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
  var folder = "./source/cs/";

  fs.readFile(folder + "build.scheme", function(err, data) {
    if (err) {
      throw err;
    };

    var files = String(data).split("\n").map(function(file) {
      return folder + file.trim();
    });

    gulp.src(files)
        .pipe(plumber())
        .pipe(include())
        .pipe(coffee())
        .pipe(concat("build.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/assets/js"));
  });
});

gulp.task("styles", function() {
  sass("./source/sass/build.scss", {
    style: "compressed"
  })
    .on("error", function(error) {
      console.log("Styles Error: ", error.message)
    })
    .pipe(concat("build.css"))
    .pipe(gulp.dest("./dist/assets/styles"));
});

gulp.task("html", function() {
  gulp.src("./source/html/**/*.html")
      .pipe(plumber())
      .pipe(html( { quotes: true } ))
      .pipe(gulp.dest("./dist"));
});

gulp.task("images", function() {
  gulp.src("./source/images/**/*.*")
      .pipe(plumber())
      .pipe(image())
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
  watch("source/sass/**/*.*", options, run("styles"));
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