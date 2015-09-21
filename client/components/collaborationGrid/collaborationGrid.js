function memberBecause(id) {
  var col = Collaborations.findOne({
    _id: id
  });
  if (col == null) return false;
  var direct = _.intersection(getEmails(), col.collaborators);
  var indirect = _.intersection(Meteor.user().profile.collaborations, col.collaborators);
  console.log(col.name, "direct", direct, "indirect", indirect);

  if ((direct.length === 0) && (indirect.length > 0)){
    return indirect;
  } else {
    return null;
  }
}

function isMember (id) {
  var col = Collaborations.findOne({
    _id: id
  });
  if (col == null) return false;

  var user = Meteor.user();
  if (user){
    if (user.profile && user.profile.collaborations){
      return user.profile.collaborations.indexOf(col.name) >= 0;
    } else {
      return false;
    }
  } else {
    return false;
  }

}

function isAdministrator (id) {
  var col = Collaborations.findOne({
    _id: id
  });
  if (col == null) return false;
  var ad = col.administrators;
  if (ad == null) return true;
  var em = User.getEmails();

  if (em && ad){
    return _.intersection(ad, em).length > 0;
  } else {
    return false;
  }
}

function isCollaborator (id) {
  var col = Collaborations.findOne({
    _id: id
  });
  if (col == null) return false;
  var ad = col.administrators;
  if (ad == null) return true;
  var em = getEmails();

  for (var i = 0; i < em.length; i++)
    if (ad.indexOf(em[i]) >= 0)
      return true;
  return false;
}

Template.collaborationGrid.hooks({
  rendered: function Sel() {
    var names = [];
    Collaborations.find({}, {
      fields: {
        name: 1
      }
    }).forEach(function (c) {
      names.push(c.name)
    });
    var moi = null;
    var defaultCollaboration = null;
    var u = Meteor.user();
    var em = User.getEmails();
    if (em)
      moi = em[0];
    if (u && u.profile)
      defaultCollaboration = u.profile.defaultCollaboration;

    names = names.sort();
    console.log(names);
    $(".collaboratorInitWithSelf").each(function () {
      var $this = $(this);
      if ($this.val() == "") {
        $this.val(this.name == "collaborators" ? defaultCollaboration : moi);
      }
    });

    // $(".collaboratorListClass").select2({
    //   tags: names
    // });
    // $(".form-control[name*='.']").select2({
    //   tags: names
    // });
    $(".collaboratorListClass").addClass("allowToGrow");
    $(".form-control[name*='.']").addClass("allowToGrow");
  }
});



Template.collaborationGrid.helpers({
  collaboration: function () {
    return Collaborations.find({}, {
      sort: {
        order: 1,
        name: 1
      }
    });
  }

});

Template.collaborationGrid.hooks({
  rendered: function () {
    var focusOn = Session.get("FocusName");
    console.log("collaborationGrid rendered focusOn", focusOn);
    if (focusOn) {
      var box = $("[name='" + focusOn + "']");
      if (box && box.length > 0) {
        $(".collaboration-focus").removeClass("collaboration-focus");
        box.children().addClass("collaboration-focus");
        var y = box.offset().top;
        console.log("focusOn y=", y);
        $('html, body').animate({
          scrollTop: y
        }, 2000);
      }
    }
  }
});



Template.collaborationGrid.events({
  'click button[name="join"]': function (evt) {
    evt.preventDefault();
    Meteor.call('joinCollaborationMethod', this._id, function (err) {
      if (err) {
        console.log ('joinCollaborationMethod error', err);
        alert ("join failed");
      } else {
        alert ("You are now part of the collaboration");
      }
    });
  },
  'click button[name="apply"]': function (evt) {
    evt.preventDefault();
    Meteor.call('applyCollaborationMethod', this._id, function (err) {
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

    Meteor.call('leaveCollaborationMethod', this._id, function (err) {
      if (err) {
        console.log('leaveCollaborationMethod error', err);
        alert("leaveCollaborationMethod failed");
      } else {
        alert("You have left the collaboration");
      }
    });
  },

  'click input[type=submit]': function (e) {
    e.preventDefault();
    var name = $('#name').val();
    var slug = slugify(name);

    Meteor.call('createCollaborationMethod', {
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



function findUser (email) {
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

function prettyList (cols) {
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
  console.log("cols", cols, a);
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
  isAdministrator: function () {
    return isAdministrator(this._id);
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
  },
  isMember: function () {
    return isMember(this._id);
  },
  memberBecause: function () {
    return memberBecause(this._id);
  }
});

Template.collaborationGridElement.events({
  'keyup input[id="addCollaborators"]': function () {
    Collaboration.addCollaborator();
  },
  'click .collaborationRemove': function (tmpl, vent) {
    if (confirm( "Are you sure you want to remove " + this.name + "?")){
      Collaborations.remove({
        _id: this._id
      });
    }
  }
});
