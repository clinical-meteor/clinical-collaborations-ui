


Template.collaborationGrid.helpers({
  owner: function () {
    return "foo";
  },
  collaboration: function () {
    return Collaborations.find({}, {
      sort: {
        order: 1,
        name: 1
      }
    });
  }

});

// Template.collaborationGrid.hooks({
//   rendered: function () {
//     var focusOn = Session.get("FocusName");
//     console.log("collaborationGrid rendered focusOn", focusOn);
//     if (focusOn) {
//       var box = $("[name='" + focusOn + "']");
//       if (box && box.length > 0) {
//         $(".collaboration-focus").removeClass("collaboration-focus");
//         box.children().addClass("collaboration-focus");
//         var y = box.offset().top;
//         console.log("focusOn y=", y);
//         $('html, body').animate({
//           scrollTop: y
//         }, 2000);
//       }
//     }
//   }
// });



Template.collaborationGrid.events({
  'click button[name="join"]': function (evt) {
    evt.preventDefault();
    Meteor.call('collaboration/join', this._id, function (err) {
      if (err) {
        console.log('collaboration/join error', err);
        alert("join failed");
      } else {
        alert("You are now part of the collaboration");
      }
    });
  },
  'click button[name="apply"]': function (evt) {
    evt.preventDefault();
    Meteor.call('collaboration/apply', this._id, function (err) {
      if (err) {
        console.log('apply error', err);
        alert("apply failed");
      } else {
        alert("You have applied to this collaboration");
      }
    });
  },
  'click button[name="leave"]': function (evt) {
    evt.preventDefault();
    Meteor.call('collaboration/leave', this._id, function (err) {
      if (err) {
        console.log('collaboration/leave error', err);
        alert("collaboration/leave failed");
      } else {
        alert("You have left the collaboration");
      }
    });
  },

  'click input[type=submit]': function (e) {
    e.preventDefault();
    var name = $('#name').val();
    var slug = slugify(name);

    Meteor.call('collaboration/create', {
        name: name,
        slug: slug
      },
      function (error, collaborationName) {
        if (error) {
          console.log(error);
          throwError(error.reason);
          clearSeenErrors();
        } else {
          $('#name').val('');
          // throwError('New collaboration "'+collaborationName+'" created');
        }
      }
    );
  }
});



function findUser(email) {
  return Meteor.users.findOne({
    "services.google.email": email
  });
  // var user = Meteor.users.findOne({
  //   "services.google.email": email
  // });
  //
  // if (user) {
  //   return user;
  // } else {
  //   return {};
  // }
}

function prettyList(cols) {
  var answerSet = {};
  cols.map(function (col, i) {
    if (col.indexOf("@") < 0) {
      var c = Collaborations.findOne({
        "_id": col
      });
      if (c)
        answerSet[c.name] = 1;
      else
        answerSet[col] = 1;
    } else {

      var u = findUser(col);
      if (u && u.username)
        answerSet[u.username] = 1;
      else
        answerSet[col] = 1;
    }
  });
  var a = Object.keys(answerSet).sort();
  //console.log("prettyList", cols, a);
  return a.length > 0 ? a.join(" ") : " noone ";
}



Template.collaborationGridElement.helpers({
  administrators: function () {
    var vv = prettyList(this.administrators);
    return vv;
  },
  collaborators: function () {
    return prettyList(this.collaborators);
  },

  requiresApproval: function () {
    console.log("requiresApproval", this, Collaborations.findOne({
      _id: this._id
    }));
    var col = Collaborations.findOne({
      _id: this._id
    });
    return col.requiresApproval === true;
  },
  isPrivate: function () {
    var col = Collaborations.findOne({
      _id: this._id
    });
    return col.isPrivate === true;
  }
});




Template.collaborationGridElement.events({
  'keyup input[id="addCollaborators"]': function () {
    Collaboration.addCollaborator();
  },
  'click .collaborationRemove': function (tmpl, vent) {
    if (confirm("Are you sure you want to remove " + this.name + "?")) {
      Collaborations.remove({
        _id: this._id
      });
    }
  }
});
