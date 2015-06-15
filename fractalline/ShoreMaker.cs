using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fractalline
{
    public class ShoreMaker
    {
        public static LinkedList<CartesianPoint> MakeShoreline(LinkedList<CartesianPoint> waypooints, double naxStepLength, double smoothness)
        {
            // bounds check
            smoothness = Math.Max(1.0, Math.Min(0.0, smoothness));
            return waypooints;
        }
    }
}
