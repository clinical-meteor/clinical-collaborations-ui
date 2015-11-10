


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



Template.collaborationGrid.events({
  'click button[name="join"]': function (evt) {
    evt.preventDefault();
    Meteor.call('collaboration/join', this._id, function (error) {
      if (error) {
        console.log('collaboration/join error', error);
        //alert("join failed");
        Session.set('errorMessage', "Failed to join collaboration... " + error);
      } else {
        // alert("You are now part of the collaboration");
        Session.set('successMessage', "You are now part of the collaboration.");
      }
    });
  },
  'click button[name="apply"]': function (evt) {
    evt.preventDefault();
    Meteor.call('collaboration/apply', this._id, function (error) {
      if (error) {
        console.log('apply error', error);
        // alert("apply failed");
        Session.set('errorMessage', "Error while applying to collaboration... " + error);
      } else {
        //alert("You have applied to this collaboration");
        Session.set('successMessage', "You have applied to this collaboration.");
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
          Session.set('errorMessage', error);
        }
        $('#name').val('');
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
  requiresAdministratorApprovalToJoin: function (){
    return this.requiresAdministratorApprovalToJoin;
  },
  hasAlreadyApplied: function (){
    if (Meteor.user()) {
      return this.hasApplied(Meteor.user().defaultEmail());
    } else {
      return false;
    }
  },
  isCollaborationMember: function (){
    if (Meteor.user()) {
      return this.hasMember(Meteor.user().defaultEmail());
    } else {
      return false;
    }
  },
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
  'click .review': function (event){
    event.preventDefault();
    event.stopPropagation();
    Router.go("/review/collaboration/" + this._id);
  },
  'click button[name="leave"]': function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    Meteor.call('collaboration/leave', this._id, function (error) {
      if (error) {
        // console.log('collaboration/leave error', error);
        // alert("collaboration/leave failed");
        Session.set('errorMessage', "Error while leaving collaboration... " + error);
      } else {
        // alert("You have left the collaboration");
        Session.set('successMessage', "You have left the collaboration.");
      }
    });
  },
  'click .collaborationLink': function (evt){
    //evt.preventDefault();
    if (Meteor.user().isMemberOfCollaboration(this._id)) {
      Router.go('/view/collaboration/' + this._id);
    }
  },
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
