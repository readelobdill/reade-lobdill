!function(){var a;$(document).ready(function(){var c=1800,d=[{name:"Myriel",pic:"pics/tsunami.png",work:"http://www.w3schools.com/tags/tag_iframe.asp",fixed:!0,r:80,x:400,y:400},{name:"WORK",pic:"pics/circles.png",work:"work/sevencircles.png",r:50},{name:"blah",pic:"pics/onebus.png",work:"work/onebus.png",r:50},{name:"noob",pic:"pics/circles.png",work:"work/sevencircles.png",r:80},{name:"boob",pic:"pics/tsunami.png",work:"work/tsunami.png",r:50},{name:"thing",pic:"pics/circles.png",work:"http://www.complex.com/",r:50},{name:"sex",pic:"pics/circles.png",work:"http://www.complex.com/",r:80}],e=[{source:0,target:1},{source:0,target:2},{source:0,target:3},{source:0,target:4},{source:0,target:5},{source:0,target:6}];a=d3.select("body").append("svg:svg").attr("id","canvas").attr("width",1400).attr("height",2e3);var f=d3.layout.force().nodes(d).links(e).linkDistance(200).size([800,2e3]).friction(.7).gravity(.001).charge(3*-c).on("tick",b).start(),g=a.selectAll(".link").data(e);g.enter().append("svg:line").style("stroke-width","2px").style("stroke","black").attr("class","link");var h=a.selectAll(".node").data(d).enter().append("g").attr("class","node").call(f.drag);h.append("svg:circle").style("fill","white").style("stroke","black").style("stroke-width","1px").attr("r",function(a){return a.r}),h.append("text").attr("dx",function(a){return-(a.r/3)}).text(function(a){return a.name})});var b=function(){a.selectAll(".link").attr("x1",function(a){return a.source.x}).attr("y1",function(a){return a.source.y}).attr("x2",function(a){return a.target.x}).attr("y2",function(a){return a.target.y}),a.selectAll(".node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"})}}();