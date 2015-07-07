Data = using("data.data");

make([], function () {
      
      console.log("start app");
      
      this.start = function () {
            use("", function (Data) {
                  console.log(new Data());
            });
      }

});
