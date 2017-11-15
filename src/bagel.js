const dimension = 300;
const fills = ['#0288c9', '#ddd'];
const bottomSize = 40;

class Bagel {

   constructor(props) {
      this.props = props;
      this.data = [ props.percent, 100 - props.percent ] ;
      this.radius = dimension * 0.5;
      this.setup();
   }

   setup() {
      this.pie = d3.layout.pie()
         .value((d) => { return d })
         .sort(null);


      this.arc = d3.svg.arc()
         .outerRadius(this.radius)
         .innerRadius(this.radius - 50);

      this.svg = d3.select(this.props.selector)
         .append('svg')
         .attr({
            width: '100%',
            viewBox: '0 0 ' + dimension + ' ' + (dimension + ((this.props.bottomLabel)? bottomSize : 0)) ,
            class: 'bagel-svg'
         });

      this.svg.append('g')
         .attr({
            transform:'translate('+dimension/2+','+dimension/2+')',
            class: 'bagel-data-points'
         });

      this.path = this.svg.select('.bagel-data-points').selectAll('path')
         .data(this.pie(this.data))
         .enter()
         .append('path')
         .attr({
             d: this.arc,
             fill: (d,i) => { return fills[i]; },
             class: (d,i) => { return (i==1)? 'bagel-data-background' : 'bagel-data-value' ; }
         });

      this.middle();
      this.bottom();
      this.animate();
   }

   middle() {
      var width;
      let text = this.svg.select('.bagel-data-points')
         .append('text')
         .attr({
            'text-anchor': 'middle',
            'class': 'bagel-middle-label',
            'font-size': '4.7em',
            'dy': 20,
            'fill': fills[0]
         })

         let percent = text.append('tspan')
            .text(this.props.percent);

         text.append('tspan')
            .text('%')
            .attr({
               'font-size': '0.6em',
               'class': 'bagel-center-text',
               'dy': -20
            });
   }

   bottom() {
      this.svg.select('.bagel-data-points')
         .append('text')
         .text(this.props.bottomLabel)
         .attr({
            'dy': dimension/2 + bottomSize,
            'text-anchor': 'middle',
            'class': 'bagel-bottom-label',
            'fill': fills[0]
         });
   }

   animate() {
      let self = this;
      this.path.transition().duration(500).attrTween("d", (a) => {
         var i = d3.interpolate({startAngle:0, stopAngle: self.props.percent}, a);
         return function(t) {
            return self.arc(i(t));
         };
      }); // redraw the arcs
   }
}
