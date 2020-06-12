var canvas = document.querySelector('#canvas');
			var ctx = canvas.getContext("2d");

			var banner = {

				makeRectangle: function(o) {
					var bool = o.isfill == undefined ? true : o.isfill;
					if(bool) {
						ctx.fillStyle = o.color;
						ctx.fillRect(o.x, o.y, o.width, o.height);
					} else {
						ctx.strokeStyle = o.color;
						ctx.strokeRect(o.x, o.y, o.width, o.height);
					}
				},

				makeCircle: function(o) {
					var bool = o.isfill == undefined ? true : o.isfill;
					if(bool) {
						ctx.fillStyle = o.color;
						ctx.arc(o.x, o.y, o.radius, 0, 2 * Math.PI);
						ctx.fill()
					} else {
						ctx.strokeStyle = o.color;
						ctx.arc(o.x, o.y, o.radius, 0, 2 * Math.PI);
						ctx.stroke()
					}
				},

				makeArc: function(o) {
					var bool = o.isfill == undefined ? true : o.isfill;
					if(bool) {
						ctx.fillStyle = o.color;
						ctx.arc(o.x, o.y, o.radius, o.begin * Math.PI, o.end * Math.PI);
						ctx.lineTo(o.x, o.y);
						ctx.fill();
					} else {
						ctx.strokeStyle = o.color;
						ctx.arc(o.x, o.y, o.radius, o.begin * Math.PI, o.end * Math.PI);
						ctx.stroke();
					}
				},

				makeLine: function(o) {
					ctx.strokeStyle = o.color;
					ctx.moveTo(o.beginX, o.beginY);
					ctx.lineTo(o.endX, o.endY);
					ctx.stroke();
				},
				
				draw:function(canvas,color,lineWidth){
					var signNameOrbit=[];
					var frag=1;
					var canvas=document.querySelector(canvas);
					var context=canvas.getContext('2d');
					var orbit=null;
					
					canvas.onmousedown=function(e){
						context.beginPath();
						if(frag==0){
							signNameOrbit=[];
							frag=1;
						}
						orbit=[];
						
						orbit.push({
							x:e.offsetX,
							y:e.offsetY
						});
						
						context.moveTo(e.offsetX,e.offsetY);
						
						this.onmousemove=function(e){
							context.strokeStyle=color||'#000';
							context.lineWidth=lineWidth||3;
							orbit.push({
								x:e.offsetX,
								y:e.offsetY
							});
							
							context.lineTo(e.offsetX,e.offsetY);
							context.stroke();
						}
					}
					
					canvas.onmouseup=function(){
						if(this.onmousemove){
							this.onmousemove=null;
							signNameOrbit.push(orbit);
						}
					}
					canvas.onmouseout=function(){
						if(this.onmousemove){
							this.onmousemove=null;
							signNameOrbit.push(orbit);
						}
					}
				}
			}