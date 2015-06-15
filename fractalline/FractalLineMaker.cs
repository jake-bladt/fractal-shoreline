using System;
using System.Collections.Generic;

namespace fractalline
{
    public static class FractalLineMaker
    {
        public LinkedList<CartesianPoint> MakeFractalLine(CartesianPoint start, CartesianPoint end, double naxStepLength, double smoothness)
        {
            var ret = new LinkedList<CartesianPoint>(new List<CartesianPoint> { start });
            smoothness = Math.Max(1.0, Math.Min(0.0, smoothness));

            var currentPoint = start;
            

            return ret;
        }
    }
}
