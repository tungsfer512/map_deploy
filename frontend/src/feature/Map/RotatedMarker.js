import { useEffect, useRef, forwardRef } from "react";
import { Marker } from "react-leaflet";

const AutoIconMarker = forwardRef(({ children, ...props }, forwardRef) => {
    const markerRef = useRef();
    const { icon } = props;
    useEffect(() => {
      const marker = markerRef.current;
      if (marker) {
        marker.options.icon = icon;
      }
    }, [icon]);
    return (
      <Marker
        ref={(ref) => {
          markerRef.current = ref;
          if (forwardRef) {
            forwardRef.current = ref;
          }
        }}
        {...props}
      >
        {children}
      </Marker>
    );
  });
  
  // const AutoStateMarker = ({ position, rotationAngle, rotationOrigin, icon, children }) => {
  //   const [state, setState] = useState({
  //     position,
  //     rotationAngle,
  //     rotationOrigin,
  //     icon,
  //   });
  //   useEffect(() => {
  //     setState({
  //       position,
  //       rotationAngle,
  //       rotationOrigin,
  //       icon,
  //     });
  //   }, [position, rotationAngle, rotationOrigin, icon]);
  //   return <RotatedMarker {...state}>{children}</RotatedMarker>;
  // };
const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
    const markerRef = useRef();
    const { rotationAngle, rotationOrigin } = props;
    useEffect(() => {
        const marker = markerRef.current;
        if (marker) {
            marker.options.rotationAngle = rotationAngle;
            marker.options.rotationOrigin = rotationOrigin;
        }
    }, [rotationAngle, rotationOrigin]);
    return (
        <Marker
            ref={(ref) => {
                markerRef.current = ref;
                if (forwardRef) {
                    forwardRef.current = ref;
                }
            }}
            {...props}
        >
            {children}
        </Marker>
    );
});


export default RotatedMarker;