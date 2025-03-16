module.exports = {
  apps : [{
    name   : "interpreter",
    script : "./app.ts",
    watch: true,
    ignore_watch : ["node_modules", "tensorflow/tf-model"],
    // watch_delay: 1000,
  }]
}
