exports.command = function (collaborationName) {
  this
    .verify.elementPresent("#collaborationGrid")
    .verify.elementPresent("#collaborationGridElements")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1)")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody h2")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody h5")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody p")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .post .cardFooter");

  if (collaborationName) {
    this
      .verify.containsText("#collaborationGridElements .collaboration:nth-child(1) .post .cardBody h2 a", collaborationName);
  };

  return this;
};
