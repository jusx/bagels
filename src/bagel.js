const bagels = {
   donut: (data, props) => {return new Donut(data, props);}   
}

class Donut {

   constructor(data, props) {
      this.props = props;
      this.data = data;
      this.setup();
   }

   setup() {
      this.pie=d3.layout.pie()
         .value(function(d){return d.percent})
         .sort(null);

      let radius = Math.min(this.props.width, this.props.height) / 2;
      this.arc=d3.svg.arc()
         .outerRadius(radius - 20)
         .innerRadius(radius - 100);

      this.svg=d3.select(this.props.selector)
        .append('svg')
        .attr({
            width: this.props.width,
            height: this.props.height,
            class: 'bagel-donut'
        }).append('g')
        .attr({
            transform:'translate('+this.props.width/2+','+this.props.height/2+')'
        });

      let color = d3.scale.category20c();
      let self = this;
      this.path = this.svg.selectAll('path')
         .data(this.pie(this.data))
         .enter()
         .append('path')
         .attr({
             d: this.arc,
             fill: function(d,i){
               return color(d.data.name);
            }
         })
         .each(function(d) { self.currentArc = d; });
         this.animate();
   }

   /**
    * Animate.
    */
   animate() {
      let self = this;
      this.path.transition().duration(500).attrTween("d", (a) => {
         var i = d3.interpolate(this.currentArc, a);
         this.currentArc = i(0);
         return function(t) {
            return self.arc(i(t));
         };
      }); // redraw the arcs
   }

   /**
    * Renders the chart in the DOM selector as specified in props.
    *
    * @param data the dataset to be used in rendering. This is optional.
    *
    */
   render(data) {
      if (arguments.length != 0) this.data = data;

      this.path = this.path.data(this.pie(this.data));
      this.animate();
   }
}
