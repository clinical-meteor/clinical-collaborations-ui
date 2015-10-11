clinical:collaborations-ui
======================================

UI components for the ``clinical:collaborations`` package.

========================================
#### Installation  

````
meteor add clinical:collaborations-ui
````


========================================
#### Blaze Helpers  

````html
{{#if isCollaborationAdmin }} ... {{/if}}
{{#if isCollaborator }} ... {{/if}}
{{#if isCollaborationMember}} ... {{/if}}
````

========================================
#### Components

````html
  {{> addCollaboratorsDialog}}
  {{> collaborationAdd}}
  {{> collaborationEdit}}
  {{> upsertCollaborationForm}}
  {{> collaborationGrid}}
  {{> collaborationMenu}}
  {{> collaborationReview}}
  {{> collaborationTagList}}
  {{> selectCollaborators}}
````



========================================
#### Licensing  

MIT.  Use as you will.  
