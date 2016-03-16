"use strict";
module.exports=function(app,model){
  app.post("/api/assignment/user",function(req,res){
      model.Create(req.body, function (users) {
          res.send(users);
      });
  });
};
