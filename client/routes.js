Template.registerHelper("Schemas", function () { return Schemas; });

 // Collaboration Grid
Router.route('collaborationGrid', {
  path: '/grid/collaborations/',
  template: "collaborationGrid",
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    },
    'mainSidebar': {
      to: 'sidebar'
    },
    'collaborationActionButtons': {
      to: 'footerActionElements'
    }
  }
});

 // Add Collaboration
Router.route('addCollaboration', {
  path: '/new/collaboration/',
  template: "upsertCollaborationForm",
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    },
    'mainSidebar': {
      to: 'sidebar'
    },
    'upsertCollaborationActionButtons': {
      to: 'footerActionElements'
    }
  }
});

// View Collaboration
Router.route('/collaboration/:collaborationName', {
  name: "viewCollaboration",
  template: "upsertCollaborationForm",
  data: function (){
    var collection = Collaborations.find({name: this.params.collaborationName });
    console.log('collection', collection.fetch());
    return collection;
  },
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    },
    'mainSidebar': {
      to: 'sidebar'
    },
    'collaborationActionButtons': {
      to: 'footerActionElements'
    }
  }
});

// View Collaboration
Router.route('/view/collaboration/:collaborationId', {
  name: "viewCollaborationById",
  template: "upsertCollaborationForm",
  data: function (){
    return Collaborations.findOne({_id: this.params.collaborationId });
  },
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    },
    'mainSidebar': {
      to: 'sidebar'
    },
    'collaborationActionButtons': {
      to: 'footerActionElements'
    }
  }
});


Router.route('/review/collaboration/:collaborationId/', {
  name: 'collaborationReviewRoute',
  template: 'collaborationReview',
  data: function (){
    return Collaborations.findOne({_id: this.params.collaborationId });
  },
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    },
    'mainSidebar': {
      to: 'sidebar'
    },
    'collaborationActionButtons': {
      to: 'footerActionElements'
    }
  }
});

//// Collaboration Review
// Router.route('/collaboration-review/:name/', {
//   name: 'collaborationReviewRoute',
//   template: 'collaborationReview',
//   waitOn: function () {
//     return Meteor.subscribe('collaborations');
//   },
//   data: function () {
//     // SECURITY Put in admin check here
//     var coll = Collaborations.findOne({
//       name: this.params.name
//     });
//     console.log("collaboration-edit route", coll);
//     return coll;
//   },
//   onBeforeAction: function () {
//     // SECURITY Put in admin check here
//     var coll = Collaborations.findOne({
//       name: this.params.name
//     });
//     if (coll)
//       Session.set("EditCollaboration", coll)
//     this.next();
//   },
//   onAfterAction: function () {
//     Session.set('collaborationName', this.params.name);
//   }
// });

//
// // adminNav.push({
// //   route: 'collaboration',
// //   label: 'Collaboration'
// // });
//
// Meteor.startup(function () {
//
//   // Router.onBeforeAction(Router._filters.isAdmin, {only: ['collaboration']});
//
//   // PostsCollaborationController = PostsListController.extend({
//   //   view: 'collaboration'
//   // });
//
//   Router.map(function () {
//
//     // Collaboration
//
//     this.route('posts_collaboration', {
//       path: '/collaboration/:name/:limit?',
//       // controller: PostsCollaborationController,
//       onBeforeAction: function () {
//
//         // first case, user is not signed in
//         if (!Meteor.user()) {
//           // render the login template but keep the url in the browser the same
//           alert(
//             "please sign in (or sign up)  first by clicking the button on the top right"
//           );
//           this.cancel();
//           return;
//         }
//
//         // typical case, user is a member of this collaboration
//         if (Meteor.user().profile.collaborations.indexOf(this.params.name) >= 0) {
//           this.next();
//           return;
//         }
//
//         var col = Collaborations.findOne({
//           name: this.params.name
//         });
//
//         // the collaboration does not exist
//         if (col == null) {
//           alert(this.params.name + " collaboration does not exist.");
//           Router.go("collaborationList");
//           return;
//         }
//
//         // the collaboration exists
//         if (isAdmin() || !col.requiresAdministratorApprovalToJoin) {
//           if (confirm("You are not a member of the " + this.params.name +
//               " collaboration. Would you like to join?")) {
//             var cols = Meteor.call('collaboration/join', col._id,
//               function (err) {
//                 if (err) {
//                   alert("collaboration/join failed: " + err)
//                   Router.go("collaborationList")
//                 } else {
//                   this.next();
//                 }
//               });
//             console.log("cols", cols);
//             Meteor.user().profile.collaborations = cols;
//           } else
//             Router.go("collaborationList")
//           return;
//         }
//
//         if (confirm("Would you like to apply for membership in  " + this.params.name +
//             "?"))
//           Meteor.user().profile.collaboration = Meteor.call(
//             'applyCollaborationMethod', col._id,
//             function (err) {
//               if (err) {
//                 console.log('applyCollaborationMethod error', err);
//                 alert("applyCollaborationMethod failed: " + err)
//               } else {
//                 alert("You are now part of the collaboration")
//                 Router.go("collaborationListFocus", {
//                   name: this.params.name
//                 });
//               }
//             });
//         Router.go("collaborationList")
//         return
//       },
//
//       onAfterAction: function () {
//         Session.set('collaborationName', this.params.name);
//       }
//     });
//
//     this.route('collaboration', {
//       path: '/collaboration/',
//       waitOn: function () {
//         return Meteor.subscribe('collaborations');
//       },
//       // controller: PostsCollaborationController,
//       onAfterAction: function () {
//         Session.set('collaborationName', "");
//       }
//     });
//
//
//     // Collaboration List
//     this.route('collaborationList', {
//       path: "collaborationList",
//       template: "collaborationGrid",
//       waitOn: function () {
//         return Meteor.subscribe('collaborations');
//       },
//       onAfterAction: function () {
//         Session.set('collaborationName', "");
//       }
//     });
//     // Collaboration Edit
//     this.route('collaborationEdit', {
//       path: '/collaboration-edit/:name/',
//       waitOn: function () {
//         return Meteor.subscribe('collaborations');
//       },
//       data: function () {
//         // SECURITY Put in admin check here
//         var coll = Collaborations.findOne({
//           name: this.params.name
//         });
//         console.log("collaboration-edit route", coll);
//         return coll;
//       },
//       /*
//       onBeforeAction: function() {
//           // SECURITY Put in admin check here
//           var coll = Collaborations.findOne({name: this.params.name});
//           if (coll)
//               Session.set("EditCollaboration", coll)
//           this.next();
//       },
//       onAfterAction: function() {
//           Session.set('collaborationName', this.params.name);
//           $(document).ready(function() {
//               Meteor.setTimeout(function() { $(".collapsed").show() }, 250);
//           })
//       }
//       */
//     });
//

//
//
//
//     // Collaboration List
//     this.route('collaborationListFocus', {
//       path: '/collaborationList/:name/',
//       template: "collaborationGrid",
//       onAfterAction: function () {
//         Session.set("FocusName", this.params.name);
//         console.log("FocusName", this.params.name);
//       }
//     });
//
//
//
//
//   });
//
// });
