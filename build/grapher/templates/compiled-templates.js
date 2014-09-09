this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["graph-data-item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "established";
  }

function program3(depth0,data) {
  
  
  return "pending";
  }

function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.validPoint), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-point-index=\""
    + escapeExpression(((stack1 = (depth0 && depth0.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.pointX)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.pointY)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

  buffer += "<tr style=\"display: none;\" class=\"grapher-data-item ";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	<td>\n		<input step=\"any\" class=\"grapher-x-input grapher-data-input\" placeholder=\"X-Axis\" type=\"number\" ";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	</td>\n	<td>\n		<input step=\"any\" class=\"grapher-y-input grapher-data-input\" placeholder=\"Y-Axis\" type=\"number\" ";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	</td>\n	<td>\n		<button style=\"visibility: hidden;\" class=\"grapher-remove-input\" type=\"button\">\n	</td>\n</tr>";
  return buffer;
  });

this["Handlebars"]["templates"]["plot-data-details"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h2>No data to display.</h2><div class=\"grapher-display details\"></div>";
  });

this["Handlebars"]["templates"]["plot-data-display"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"grapher-container-left open\">\n	<h2>No data to display.</h2>\n	<div class=\"grapher-display details\"></div>\n</div>\n<div class=\"grapher-container-right display closed\">\n	<button class=\"grapher-data-toggle\" title=\"Display Data\">\n		<span class=\"grapher-data-arrow\" ></span>\n		<p class=\"grapher-data-slide-title\">Show Data</p>\n		<span class=\"grapher-data-arrow\" ></span>\n	</button>\n	<div class=\"grapher-point-labels\">\n		<span><h4 class=\"grapher-details-independent-label\"></h4></span>\n		<span><h4 class=\"grapher-details-series-label\"></h4></span>\n		<span><h4 class=\"grapher-details-series-label\"></h4></span>\n		<span><h4 class=\"grapher-details-series-label\"></h4></span>\n	</div>\n	<div class=\"grapher-data-container\">\n		<div class=\"grapher-data-scrollable\">\n			<table class=\"grapher-data-entry\"></table>\n		</div>\n	</div>\n</div>";
  });

this["Handlebars"]["templates"]["plot-data-edit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- TODO - add dataset-index attr -->\n<div class=\"grapher-container-left\">\n	<input placeholder=\"Title\" class=\"grapher-title\" type=\"text\" >\n	<h2>This graph could use some points!</h2>\n	<div class=\"grapher-display edit-mode\"></div>\n	<input placeholder=\"auto\" class=\"grapher-y-max grapher-bounds-input\" type=\"number\" ><span class=\"grapher-bounds-label-y-max\">Y-Max</span>\n	<input placeholder=\"Y-Axis\" class=\"grapher-y-axis-title\" type=\"text\" >\n	<input value='0' placeholder=\"auto\" class=\"grapher-y-min grapher-bounds-input\" type=\"number\" ><span class=\"grapher-bounds-label-y-min\">Y-Min</span>\n	<input placeholder=\"auto\" class=\"grapher-x-min grapher-bounds-input\" type=\"number\" ><span class=\"grapher-bounds-label-x-min\" >X-Min</span>\n	<input placeholder=\"X-Axis\" class=\"grapher-x-axis-title\" type=\"text\" >\n	<input placeholder=\"auto\" class=\"grapher-x-max grapher-bounds-input\" type=\"number\" ><span class=\"grapher-bounds-label-x-max\">X-Max</span>\n</div>\n<div class=\"grapher-container-right\">\n	<div class=\"grapher-graph-selector\">\n		<button type=\"button\" title=\"Line\" class=\"grapher-graph-type line\" data-graph-type=\"line\"></button>\n		<button type=\"button\" title=\"Scatter\" class=\"grapher-graph-type scatter\" data-graph-type=\"scatter\"></button>\n		<button type=\"button\" title=\"Area Spline\" class=\"grapher-graph-type areaspline\" data-graph-type=\"areaspline\"></button>\n	</div>\n	<div class=\"grapher-series-tabs\">\n	</div>\n	<div class=\"grapher-point-labels\">\n		<span><h4>X-Values</h4></span>\n		<span><h4>Y-Values</h4></span>\n	</div>\n	<div class=\"grapher-data-container\">\n		<div class=\"grapher-data-scrollable\">\n			<table cellpadding=\"0\" cellspacing=\"0\" class=\"grapher-data-entry\"></table>\n		</div>\n	</div>\n</div>";
  });

this["Handlebars"]["templates"]["plot-display-row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"grapher-display-row\">\n	<td>\n		<p class=\"grapher-x-value-display\">"
    + escapeExpression(((stack1 = (depth0 && depth0.x)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n	</td>\n	<td>\n		<p class=\"grapher-y-value-display\">"
    + escapeExpression(((stack1 = (depth0 && depth0.y1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n	</td>\n	<td>\n		<p class=\"grapher-y-value-display\">"
    + escapeExpression(((stack1 = (depth0 && depth0.y2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n	</td>\n	<td>\n		<p class=\"grapher-y-value-display\">"
    + escapeExpression(((stack1 = (depth0 && depth0.y3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n	</td>\n</tr>";
  return buffer;
  });

this["Handlebars"]["templates"]["plot-series-tab"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div class=\"grapher-series ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"  data-series-index=\""
    + escapeExpression(((stack1 = (depth0 && depth0.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<input value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.val)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"border-top: 5px solid "
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " !important;\" class=\"grapher-series-name\" type=\"text\"></input>\n</div>";
  return buffer;
  });