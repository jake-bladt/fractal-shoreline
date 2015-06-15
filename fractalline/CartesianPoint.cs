using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fractalline
{
    public class CartesianPoint
    {
        public double X { get; set; }
        public double Y { get; set;}

        public double distanceFrom(CartesianPoint that)
        {
            return Math.Sqrt(squareDifference(this.X, that.X) + squareDifference(this.Y, that.Y));
        }

        protected double squareDifference(double s1, double s2)
        {
            return Math.Pow(s1 - s2, 2.0);
        }
    }
}
