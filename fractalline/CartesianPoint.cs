﻿using System;
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

        public CartesianPoint(double x, double y) { X = x; Y = y; }

        public double distanceFrom(CartesianPoint that)
        {
            return Math.Sqrt(squareDifference(this.X, that.X) + squareDifference(this.Y, that.Y));
        }

        public CartesianPoint pointAt(double directionRads, double distance)
        {
            // reduce direction
            directionRads = directionRads % (2.0 * Math.PI);
            return new CartesianPoint(this.X + Math.Cos(directionRads), this.Y + Math.Sin(directionRads));
        }

        protected double squareDifference(double s1, double s2)
        {
            return Math.Pow(s1 - s2, 2.0);
        }

        public bool IsEquivilentTo(CartesianPoint that, double epsilon = Double.Epsilon)
        {
            return (Math.Abs(this.X - that.X) <= epsilon) && 
                   (Math.Abs(this.Y - that.Y) <= epsilon);            
        }
    }
}
