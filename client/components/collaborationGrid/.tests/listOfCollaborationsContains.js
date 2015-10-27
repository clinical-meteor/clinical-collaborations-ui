exports.command = function (collaborationName) {
  this
    .verify.elementPresent("#collaborationGrid")
    .verify.elementPresent("#collaborationGridElements")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1)")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1)")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody h2")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody h5")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardBody p")
    .verify.elementPresent("#collaborationGridElements .collaboration:nth-child(1) .cardFooter");

  if (collaborationName) {
    this
      .verify.containsText("#collaborationGridElements .collaboration:nth-child(1) .cardBody h2 a", collaborationName);
  };

  return this;
};
