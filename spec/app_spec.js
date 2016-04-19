var proxy = require('express-http-proxy');
var request = require('supertest');
var app = require('express')();
var fs = require("fs");
var glog = require("glob");
var path = require("path");

var server = "http://localhost:12306";

app.use(proxy(server, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}))




glog("mock-apis/**/*.json", function(err, files) {
  // files.forEach((file)=> {
  //   console.log(file.split("/"));
  //   console.log(path.basename(file, '.json'));
  //   console.log(path.dirname(file));
  // });
});

describe("abc", ()=> {
  it("def", (done)=> {

    fs.readFile('mock-apis/foo.json', 'utf8', (err, data) => {
      var apis = JSON.parse(data);
      apis.forEach((api) => {
        request(app)
          .get(api.request.uri)
          .expect((res) => {
            expect(res.body).toEqual(api.response.json)
          })
          .end(done);
      })
    })
    // request(app)
    //   .get("foo")
    //   .expect(function(res) {
    //     expect(res.body).toEqual({
    //       "name": "tom"
    //     });
    //   })
    //   .end(done);


  })
})
