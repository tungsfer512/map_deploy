import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Popup, LayersControl, LayerGroup, useMapEvent, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Routing from './Routing';
import "leaflet-rotatedmarker";
import { _getAngle, green_bin, red_bin, yellow_bin, green_vehicle, bien_cam } from './constants';

import { getVehiclesData } from '../../api/vehicle/vehicles';
import { getBinsData } from '../../api/bin/bins';
import { Alert, Box, Typography } from '@mui/material';
import TabPanelItem from './TabPanelItemBin';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { addNoti, increment } from '../../store/reducers/notiSlice';
import { getRoutesByVehicleId } from '../../store/reducers/vehicleSlice';
import ws from './WebSocket';
import RotatedMarker from './RotatedMarker';
import PopupVehicleMarker from './PopupVehicleMarker';
import PopupBinMarker from './PopupBinMarker';
import AlertContent from './AlertContent';
import AlertAPIContent from './AlertAPIContent';
import AlertResetContent from './AlertResetContent';
import TabPanelVehicle from './TabPanelVehicle';
import TabPanelItemBin from './TabPanelItemBin';
import axios from 'axios';
import { getResetBinWeightAsync } from '../../store/reducers/binSlice';
import { clearWayPoints, setWayPoints, waypointsSelector } from '../../store/reducers/waypointSlice';
import { isStaff } from '../Auth/Role';
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const kb1 = [
  [20.980391258928854,105.78782692551614],
  [20.980407537441224,105.78781083226205],
  [20.980443851039325,105.78778803348543],
  [20.98045136419646,105.78777596354487],
  [20.98047640805082,105.78775048255922],
  [20.98049519093884,105.78773707151414],
  [20.98051272163219,105.78770488500597],
  [20.980552791780703,105.78768745064737],
  [20.980564061508044,105.78766599297525],
  [20.980582844385047,105.78765124082567],
  [20.980591609726837,105.78764051198961],
  [20.980609140408877,105.78762307763101],
  [20.980626671088856,105.78760698437692],
  [20.98064294957558,105.78758686780931],
  [20.98066799339783,105.78758016228677],
  [20.980693037215882,105.7875452935696],
  [20.980713072267303,105.78753322362901],
  [20.98074062045862,105.78749969601633],
  [20.980743124839396,105.7874970138073],
  [20.980764412074304,105.78747957944873],
  [20.98079822120588,105.78746616840364],
  [20.980819508432923,105.78749969601633],
  [20.980848308794126,105.7875318825245],
  [20.980875856960502,105.78756138682365],
  [20.980883370095906,105.78758820891383],
  [20.98090590949985,105.78761234879495],
  [20.980934709844394,105.78764453530313],
  [20.980953492674796,105.78766867518428],
  [20.98097853644499,105.78769952058794],
  [20.980983545198534,105.78771159052852],
  [20.981030627481207,105.78772768378258],
  [20.981074454053672,105.78777596354487],
  [20.98111452405154,105.78777596354487],
  [20.981147080916884,105.78777730464937],
  [20.98117462902819,105.78777328133584],
  [20.981209690253394,105.78776121139526],
  [20.981233481794387,105.78775987029076],
  [20.981253516773343,105.78775316476823],
  [20.981276056121448,105.78773170709611],
  [20.98131487387966,105.78769952058794],
  [20.981364961294705,105.78767269849779],
  [20.981405031214663,105.7876391708851],
  [20.981433831462983,105.78762307763101],
  [20.981447605492832,105.78760966658595],
  [20.98145887515267,105.78759491443634],
  [20.98146513607443,105.78756138682365],
  [20.98146513607443,105.78752249479295],
  [20.98145762296829,105.7874956727028],
  [20.9814488576773,105.78745409846309],
  [20.981430074909174,105.78742861747742],
  [20.98141129213868,105.78741118311885],
  [20.98139000499593,105.78737899661067],
  [20.98137372659062,105.78736826777461],
  [20.981364961294705,105.787350833416],
  [20.9813449263307,105.78731730580331],
  [20.981321134807455,105.78728243708613],
  [20.981308612951587,105.78723415732387],
  [20.981283569236723,105.78720197081569],
  [20.98126478644782,105.78717917203905],
  [20.98123849053938,105.78711614012721],
  [20.98123598616691,105.7870799303055],
  [20.98125602114552,105.78703969717027],
  [20.981269795191757,105.78702092170717],
  [20.981291082351618,105.78700482845308],
  [20.981312369508462,105.78697666525841],
  [20.981323639178513,105.7869538664818],
  [20.98134743070135,105.78692704439166],
  [20.981359952553962,105.7869163155556],
  [20.981374978775712,105.78689619898796],
  [20.981396265920594,105.78688949346544],
  [20.981421309616568,105.78685864806178],
  [20.98142631835526,105.78684389591218],
  [20.981461379521413,105.78682109713554],
  [20.98148141446981,105.78679829835893],
  [20.98150520596752,105.78677684068681],
  [20.981523988726206,105.7867352664471],
  [20.98155153676801,105.78671380877498],
  [20.98157908480472,105.78668966889383],
  [20.981594111004423,105.78667759895326],
  [20.981621659033298,105.78665345907213],
  [20.981645450508683,105.78663468360902],
  [20.98165672015361,105.78661859035493],
  [20.981688024718355,105.78659042716026],
  [20.98170179872476,105.78656896948817],
  [20.98170179872476,105.78651264309885],
  [20.98167224721089,105.78647589685376],
  [20.98165596883633,105.78643700482304],
  [20.98164219482569,105.78641688825543],
  [20.981619655532825,105.78639274837428],
  [20.981607133701967,105.78636860849318],
  [20.98158835095375,105.7863605618661],
  [20.981562055102255,105.78632971646245],
  [20.98154953326658,105.7863028943723],
  [20.981533254878645,105.78628277780469],
  [20.981488176256633,105.78630959989484],
  [20.981476906599,105.78632301093991],
  [20.981444349805525,105.78634446861203],
  [20.98143308014458,105.78636994959766],
  [20.98141429737448,105.7863940894788],
  [20.98139175804723,105.78642359377798],
  [20.98135794904996,105.78644102813657],
  [20.981341670641154,105.78646248580868],
  [20.981320383488494,105.78648126127179],
  [20.981309113818202,105.7864986956304],
  [20.98127906135996,105.78652954103406],
  [20.981262782942547,105.78654026987012],
  [20.98124400015104,105.78658184410985],
  [20.981206434560892,105.78660732509549],
  [20.981181390828905,105.78661403061803],
  [20.981175630800525,105.78662502769136],
  [20.981156847998037,105.78664246204995],
  [20.981138065193203,105.7866652608266],
  [20.98112554332201,105.78667867187166],
  [20.98111176926245,105.78669878843927],
  [20.98109924738905,105.78670415285728],
  [20.981069194888587,105.7867256105294],
  [20.981046655509275,105.78674438599253],
  [20.981037890194173,105.78677389029168],
  [20.981001576740447,105.78680071238183],
  [20.980976532974108,105.7868154645314],
  [20.980961506712298,105.78684228662158],
  [20.98094648044896,105.78685569766664],
  [20.980931454184123,105.78686508539819],
  [20.980925193239994,105.7868838608613],
  [20.980908914784035,105.78689727190637],
  [20.980873853488234,105.78692275289202],
  [20.980866340352346,105.78692677620553],
  [20.980851314079455,105.78694152835511],
  [20.980835035615442,105.78695225719117],
  [20.9808124962008,105.7869938314309],
  [20.980787452402772,105.78700321916244],
  [20.98076491298094,105.78701663020753],
  [20.98074613012684,105.78704881671571],
  [20.98072609507986,105.78706893328331],
  [20.980709816602207,105.78708502653741],
  [20.980688529359515,105.78710380200052],
  [20.9806684943048,105.78712525967264],
  [20.98065472020313,105.78714403513574],
  [20.98064094610019,105.78717085722589],
  [20.980625919804616,105.78723254803324],
  [20.980644702673835,105.7872620523324],
  [20.980670998686787,105.78730094436311],
  [20.980700049491823,105.78730657696725],
  [20.980720084542313,105.78734010457994],
  [20.98074888492266,105.78737899661067],
  [20.980770172156756,105.78741520643237],
  [20.98078645062784,105.78743532299997],
  [20.980796468147624,105.7874608039856],
  [20.980796468147624,105.78746616840364],
  [20.9807689199666,105.7874956727028],
  [20.9807388673997,105.78750908374788],
  [20.980721336732874,105.78753590583803],
  [20.98070881482674,105.78754261136056],
  [20.980693788537998,105.78755870461465],
  [20.980683771011336,105.78756675124171],
  [20.980664988147026,105.78757882118227],
  [20.980643700897947,105.78759625554086],
  [20.980633683367927,105.78761905431749],
  [20.980611143922914,105.78762710094452],
  [20.980589856666164,105.78764587640765],
  [20.980573578173665,105.78766196966173],
  [20.980553543103543,105.78768610954286],
  [20.98054352556748,105.78770622611046],
  [20.980517229532083,105.78772366046907],
  [20.98046213306199,105.78777194023132],
  [20.980454619905405,105.7877840101719],
  [20.980418306309915,105.78779876232149],
  [20.980409540957957,105.78780949115755],
  [20.980394514639116,105.78782558441162],
  [20.980387001479134,105.7878376543522],
  [20.980381992705603,105.78784167766572]
];

const kb2 = [
  [20.98036646550657,105.7878550887108],
  [20.980380239634815,105.78784704208375],
  [20.98040027472817,105.78781351447108],
  [20.980430327363198,105.78779608011247],
  [20.980454119028284,105.78776791691782],
  [20.980482919459917,105.78774109482767],
  [20.980514224270593,105.78771561384202],
  [20.980541772498572,105.78768879175188],
  [20.980569320721475,105.78766196966173],
  [20.980598121130893,105.7876418530941],
  [20.980630678108778,105.78761234879495],
  [20.98065822631528,105.78757748007777],
  [20.98068452232584,105.78755736351015],
  [20.980714574903686,105.78752920031548],
  [20.98073961871394,105.78750371932985],
  [20.980790958511804,105.78745543956758],
  [20.98078344537176,105.78742459416391],
  [20.980762158139562,105.78739508986473],
  [20.980738366523518,105.78736826777461],
  [20.980722088047205,105.78733876347543],
  [20.980700800806254,105.78730791807176],
  [20.98067700918044,105.78729048371316],
  [20.980656974124184,105.78725427389146],
  [20.980629425917453,105.78721269965175],
  [20.980629425917453,105.78716441988945],
  [20.980655721933076,105.78713223338127],
  [20.98069078328007,105.78710138797761],
  [20.980727096809332,105.78707188367846],
  [20.98074838404653,105.78706249594688],
  [20.98078219318172,105.78703299164773],
  [20.980798471651482,105.78701421618464],
  [20.980822263257956,105.78699946403505],
  [20.98086108113408,105.78696593642235],
  [20.980879863973744,105.7869364321232],
  [20.980904907756276,105.78691497445108],
  [20.980929951534623,105.7868801057339],
  [20.98098630002054,105.78682377934457],
  [20.981012595973365,105.78679829835893],
  [20.981036387545746,105.78676879405977],
  [20.981056422551124,105.78674733638765],
  [20.981073953178637,105.78673124313354],
  [20.98108897942914,105.78671917319298],
  [20.981109014427457,105.78669369220735],
  [20.98111652755114,105.78667894005777],
  [20.981144075668066,105.78671246767045],
  [20.981169119406328,105.7867406308651],
  [20.981197919700126,105.78677684068681],
  [20.981224215615704,105.78681439161302],
  [20.981254268084985,105.78685596585275],
  [20.98128181617651,105.78688815236093],
  [20.98130435552035,105.78691497445108],
  [20.981319381747696,105.78694581985475],
  [20.98129308584886,105.78698605298997],
  [20.981273050875213,105.78701019287111],
  [20.981254268084985,105.78705713152888],
  [20.981229224361,105.78709468245506],
  [20.981226719988378,105.78715100884439],
  [20.98124925934053,105.78719660639763],
  [20.981284320548216,105.78722879290581],
  [20.981314373005414,105.7872784137726],
  [20.981353190753676,105.7873320579529],
  [20.9813945128617,105.78737497329713],
  [20.981412043449534,105.78740984201433],
  [20.981443348065554,105.78745275735857],
  [20.981403278155874,105.78740313649179],
  [20.981366964790958,105.78735351562501],
  [20.981336912344332,105.78730657696725],
  [20.981300598963283,105.78725159168243],
  [20.981254268084985,105.7871899008751],
  [20.981215450311037,105.78711748123169],
  [20.981244250595903,105.78705310821535],
  [20.98129684240613,105.78700482845308],
  [20.981326894860782,105.78695923089984],
  [20.981363208235457,105.78692972660065],
  [20.981398269416413,105.78689083456996],
  [20.98143333058914,105.78683987259866],
  [20.981463383016365,105.78681036829948],
  [20.9814984441738,105.78678220510486],
  [20.981543522792723,105.7867352664471],
  [20.981577331747992,105.78669905662538],
  [20.981612392878695,105.78665077686311],
  [20.981644949635555,105.78662395477296],
  [20.98166874110724,105.78659981489183],
  [20.981688776027813,105.78657433390617],
  [20.981716324039233,105.786542147398],
  [20.981705054398812,105.78649654984476],
  [20.981677506385317,105.78647106885911],
  [20.981659975828627,105.7864348590374],
  [20.981632427806826,105.78639462590219],
  [20.981606131963105,105.78635975718501],
  [20.9815810882981,105.7863248884678],
  [20.981559801179547,105.7862886786461],
  [20.98154602716004,105.78626856207848],
  [20.981502200725902,105.78629136085512],
  [20.981485922332816,105.7863248884678],
  [20.981453365541288,105.78634634613992],
  [20.98143833932743,105.78636378049852],
  [20.981409539079976,105.78639328479768],
  [20.981379486641927,105.78642278909685],
  [20.98135193856841,105.78645229339601],
  [20.981325642675298,105.78647106885911],
  [20.981305607706027,105.78650191426279],
  [20.98126428557341,105.786539465189],
  [20.981244250595903,105.78656494617462],
  [20.981235485292395,105.78656762838365],
  [20.981206685005837,105.78658908605577],
  [20.98118539783394,105.78661993145944],
  [20.981156597537726,105.78663870692256],
  [20.981122788487255,105.78667357563974],
  [20.981066440052814,105.78672453761104],
  [20.981035135357818,105.7867714762688],
  [20.980990056585515,105.78680768609048],
  [20.980958751874518,105.78683719038966],
  [20.980919934023788,105.78687474131584],
  [20.980901151189162,105.78690290451051],
  [20.98087235083815,105.78692704439166],
  [20.98085607237644,105.78694984316829],
  [20.980827272016743,105.78695923089984],
  [20.980807236980628,105.78699812293053],
  [20.980777184421434,105.78701555728914],
  [20.98073335776177,105.78705579042436],
  [20.980698296424773,105.78710004687312],
  [20.980646956595052,105.7871349155903],
  [20.98062441715204,105.78719794750215],
  [20.980645704403855,105.7872435450554],
  [20.9806732526076,105.78728780150414],
  [20.980707061759798,105.7873132824898],
  [20.9807371143331,105.78735217452049],
  [20.98075840156887,105.78738033771516],
  [20.98077593223133,105.78741654753685],
  [20.980790958511804,105.78744739294055],
  [20.980765914710176,105.78747555613518],
  [20.980738366523518,105.78750237822535],
  [20.980699548615526,105.78753590583803],
  [20.980656974124184,105.78757211565971],
  [20.980618156195035,105.78761100769044],
  [20.98058309483102,105.78765928745271],
  [20.98054803345877,105.78768879175188],
  [20.980514224270593,105.78771561384202],
  [20.980477910689594,105.78775450587275],
  [20.980431579556175,105.78778803348543],
  [20.9804077878875,105.78781887888908],
  [20.980375230861046,105.78784972429277],
  [20.980362708925917,105.78786313533784]
];

const kb = kb1;

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

let id = -1;

function ZoomHandler({ waypoints }) {
  const [zoomLevel, setZoomLevel] = useState(17); // initial zoom level provided for MapContainer
  const map = useMap();
  useMapEvents({
    zoomend: () => {
      if (waypoints.oldVehicleId === null) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1;
      }
    },
    zoomstart: () => {
      if (waypoints.oldVehicleId === null) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1;
      }
      setZoomLevel(map.getZoom());
    },
    zoomlevelschange: () => {
      if (waypoints.oldVehicleId === null) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1;
      }
    },
  });
  return null
}

// WebSocket init

const Map1 = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [position, setPosition] = useState([21.0419, 105.821]);
  const [heading, setHeading] = useState(0);
  const [data, setData] = useState([]);
  const [dataAlert, setDataAlert] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bins, setBins] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [openVehicle, setOpenVehicle] = useState(false);
  const [openBin, setOpenBin] = useState(false);
  const [item, setItem] = useState({});
  const [itemBin, setItemBin] = useState({});
  const [itemVehicle, setItemVehicle] = useState({});
  const [itemListRoutes, setItemListRoutes] = useState([]);

  // const [zoom, setZoom] = useState(-1);

  useEffect(() => {
    if (!isStaff()) {
      getBinsData().then((data) => {
        setBins(data);
      });
    } else {
      const user = localStorage.getItem('user')
      getBinsData(JSON.parse(user)?.companyId).then((data) => {
        setBins(data);
      });
    }
  }, []);

  useEffect(() => {
    getVehiclesData().then((data) => {
      setVehicles(data);
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // receive data from server

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data received", data);
      if (data[0] === "no-alert") {
        setDataAlert(data);
      }
      else if (data[0] === "alert") {
        enqueueSnackbar(JSON.stringify(data),
          {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 3000,
            content: (key, message) => (
              <Alert
                key={key}
                message={message}
                severity="warning"
                color="warning"
                onClose={() => closeSnackbar(key)}
                sx={{ width: "250px" }}
                icon={false}
              >
                <AlertContent data={data} />
              </Alert>
            ),
          });
        setDataAlert(data);
        dispatch(addNoti(data));
        dispatch(increment());
      }
      else if (data[0] === 'alert_api') {
        enqueueSnackbar(JSON.stringify(data),
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            autoHideDuration: 5000,
            content: (key, message) => (
              <Alert
                key={key}
                message={message}
                severity="error"
                color="error"
                onClose={() => closeSnackbar(key)}
                sx={{ width: "250px" }}
                icon={false}
              >
                <AlertAPIContent data={data[1]} />
              </Alert>
            ),
          });
      }
      else if (data[0] === 'alert_reset') {
        enqueueSnackbar(JSON.stringify(data),
          {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 5000,
            content: (key, message) => (
              <Alert
                key={key}
                message={message}
                severity="success"
                color="success"
                onClose={() => closeSnackbar(key)}
                sx={{ width: "250px" }}
                icon={false}
              >
                <AlertResetContent data={data[4]} />
              </Alert>
            ),
          });
        setDataAlert(data);
        dispatch(addNoti(data));
        dispatch(increment());
      }
      else {
        setData(data);
      }
      // const angle = _getAngle(position[0], position[1], data[1], data[2]);
      // if (Math.abs(angle) !== 90) {
      //   setPosition([data[1], data[2]]);
      //   setHeading(angle);
      // }
      // setItem(item);
    }
  }, []);

  useEffect(() => {
    if (data[0] !== "alert" && data[0] !== "no-alert" && data[0] !== "alert_api" && data[0] !== "alert_reset") {
      if (!!vehicles && vehicles?.length > 0) {
        let vehicle = vehicles.find(item => item.id.toString() === data[0].toString());
        if (vehicle) {
          let oldLat = vehicle.latitude;
          let oldLong = vehicle.longitude;
          const angle = _getAngle(oldLat, oldLong, data[1], data[2]);
          if (Math.abs(angle) !== 90) {
            console.log("data4-----------____----__---__---___--___---------");
            const vehicleData = {
              ...vehicle,
              latitude: data[1],
              longitude: data[2],
              camera: data[3],
              angle: angle
            }
            const vehiclesUpdate = [...vehicles.filter(item => item.id.toString() !== data[0].toString()), vehicleData];
            for (let bin of bins) {
              if (bin.status === "full") {
                let binCoor = L.latLng(bin.latitude, bin.longitude);
                let vehicleCoor = L.latLng(data[1], data[2]);
                let distance = binCoor.distanceTo(vehicleCoor);
                if (distance < 5) {
                  dispatch(getResetBinWeightAsync(bin.id));
                  console.log("reset bin weight");
                }
              }
            }
            if (data[0]?.toString() === itemVehicle?.id?.toString()) {
              setItemVehicle(vehicleData);
            }
            setVehicles(vehiclesUpdate);
          } else {
            console.log("data5-----------____----__---__---___--___---------");
            const vehicleData = {
              ...vehicle,
              camera: data[3],
            }
            const vehiclesUpdate = [...vehicles.filter(item => item.id.toString() !== data[0].toString()), vehicleData];
            if (data[0]?.toString() === itemVehicle?.id?.toString()) {
              setItemVehicle(vehicleData);
            }
            setVehicles(vehiclesUpdate);
          }
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataAlert[0] === "alert" || dataAlert[0] === "no-alert" || dataAlert[0] === "alert_reset") {
      if (!!bins && bins?.length > 0) {
        let bin = bins.find(item => item.id.toString() === dataAlert[1].id.toString());
        if (bin) {
          const binData = {
            ...bin,
            weight: dataAlert[1].weight,
            status: dataAlert[1].status
          }
          const binsUpdate = [...bins.filter(item => item.id.toString() !== dataAlert[1].id.toString()), binData];
          setBins(binsUpdate);
          if (dataAlert[1]?.id?.toString() === itemBin?.id?.toString()) {
            console.log("-============================================================-0", dataAlert)
            setItemBin(binData)
          }
          console.log("update bin in map");
        }
      }
    }
    // if (dataAlert[0] === "alert") {
    //   let binCoor = L.latLng(dataAlert[1]['latitude'], dataAlert[1]['longitude']);
    //   for (let vehicle of vehicles) {
    //     let vehicleCoor = L.latLng(vehicle['latitude'], vehicle['longitude']);
    //     if (binCoor.distanceTo(vehicleCoor) < 5) {
    //       // axios.get('path/to/reset/bin/weight')
    //       break;
    //     }
    //   }
    // }
  }, [dataAlert]);

  const handleClickOpenVehicle = (e, item) => {
    console.log("click open vehicle", item);
    setOpenVehicle(true);
    setItemVehicle(item);
    if (openBin) setOpenBin(false);


  };

  const waypoints = useSelector(waypointsSelector);

  const handleClickOpen = async (e, vehicle) => {
    // if (showWaypoints) {
    try {
      var allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
      if (allLeafletElements) {
        console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(allLeafletElements);
        let ind = allLeafletElements.length - 1;
        while (ind >= 0) {
          allLeafletElements[ind].remove();
          ind--;
        }
        dispatch(clearWayPoints());
      }
      if (waypoints.oldVehicleId !== vehicle.id) {
        id = vehicle.id;
        try {
          let routeData = await getRoutesByVehicleId(vehicle.id);
          let route = routeData.map((item, index) => {
            // console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", item);
            return [
              item?.demand?.latitude,
              item?.demand?.longitude
            ]
          })
          // route = [[vehicle.latitude, vehicle.longitude], ...route]
          route = [...route]
          const listRoutes = routeData.map((item, index) => {
            return item.company
          })
          setItemListRoutes(listRoutes)

          console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", route);
          setRoutes(route);
          const payload = {
            data: route,
            hideInMap: true,
            oldVehicleId: vehicle.id,
          }
          dispatch(setWayPoints(payload))
        } catch (err) {
          console.log(">>>>>>>>>>>>>>>check >>>>>>>>>>>>>", err);
          enqueueSnackbar(JSON.stringify(['alert_api', 'Lỗi khi gọi API lấy tuyến đường đi của xe hiện tại']),
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              autoHideDuration: 3000,
              content: (key, message) => (
                <Alert
                  key={key}
                  message={message}
                  severity="error"
                  color="error"
                  onClose={() => closeSnackbar(key)}
                  sx={{ width: "250px" }}
                  icon={false}
                >
                  <AlertAPIContent data={'Lỗi khi gọi API lấy tuyến đường đi của xe hiện tại'} />
                </Alert>
              ),
            });
        }
      }
      else {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1
        dispatch(clearWayPoints());
      }

      if (vehicle.id === waypoints.oldVehicleId) {
        let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
        if (allLeafletElements) {
          console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          console.log(allLeafletElements);
          let ind = allLeafletElements.length - 1;
          while (ind >= 0) {
            allLeafletElements[ind].remove();
            ind--;
          }
        }
        id = -1
        dispatch(clearWayPoints());
      }
      // goi api lay routes --> set state cho mang routes --> lay routing machine cho 2 diem 1 --> neu di den diem cuoi thi set lai state mang routes = routes[1:] --> xoa tat ca layer routing --> lay routing moi
      let item_x = {
        ...vehicle,
        routes: ["A", "B", "C", "D"]
      }
      handleClickOpenVehicle(e, item_x);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("waypoints", waypoints);
    if (waypoints.oldVehicleId === null || waypoints.oldVehicleId === id) {
      let allLeafletElements = document.querySelectorAll(".leaflet-container .leaflet-overlay-pane svg  path");
      if (allLeafletElements) {
        console.log("remove waypoints XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
        console.log(allLeafletElements);
        let ind = allLeafletElements.length - 1;
        while (ind >= 0) {
          allLeafletElements[ind].remove();
          ind--;
        }
      }
      id = -1;
    }
  }, [waypoints.oldVehicleId])

  const handleCloseVehicle = (e) => {
    setOpenVehicle(false);
    setItemVehicle({});
  };

  const handleClickOpenBin = (e, item) => {
    setOpenBin(true);
    setItemBin(item);
    if (openVehicle) setOpenVehicle(false);
  };

  const handleCloseBin = (e) => {
    setOpenBin(false);
    setItemBin({});
  };

  const iconxeUrl = green_vehicle;
  const iconXe = new L.Icon({ iconUrl: iconxeUrl, iconSize: [35, 16], className: "leaflet-rotated-icon-move-smoothing" });
  const iconBinGreenUrl = green_bin;
  const iconBinRedUrl = red_bin;
  const iconBinYellowUrl = yellow_bin;
  const iconBienCam = bien_cam;
  const iconBinGreen = new L.Icon({ iconUrl: iconBinGreenUrl, iconSize: [16, 24] })
  const iconBinRed = new L.Icon({ iconUrl: iconBinRedUrl, iconSize: [16, 24] })
  const iconBinYellow = new L.Icon({ iconUrl: iconBinYellowUrl, iconSize: [16, 24] })
  const iconChan = new L.Icon({ iconUrl: iconBienCam, iconSize: [40, 40] })

  return (
    <Fragment>
      <Box sx={{ position: 'relative', with: '100%' }}>
        <Box sx={{ height: "calc(100vh - 64px - 5px)" }}>
          <MapContainer center={[20.9809226,105.7871205]} zoom={19} style={{ height: "inherit" }} scrollWheelZoom={true}
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Map Layer Default">
                <TileLayer
                  url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                  maxZoom= {20}
                  subdomains={['mt1','mt2','mt3']}
                  // url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  // attribution= {'&copy; +mapLink+, +wholink'}
                  // maxZoom= {20}
                  // url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                  // maxZoom= {20}
                  // subdomains={['mt0','mt1','mt2','mt3']}
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {/* <Polyline pathOptions={{ color: 'black' }} positions={dataTemporary} /> */}
            {/* {data[0] === "alert" &&
            } */}
            {/* {!!vehicles && !!bins && <Routing from={[vehicles[3].latitude, vehicles[3].longitude]} to={[bins[5].latitude, bins[5].longitude]} />} */}

            {!!vehicles && vehicles.map((vehicle) => (
              <RotatedMarker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={iconXe} rotationOrigin="center" rotationAngle={vehicle.angle}
                eventHandlers={{
                  click: (e) => {
                    if (!openVehicle) {
                      return handleClickOpen(e, vehicle)
                    } else {
                      return handleCloseVehicle(e)
                    }
                  }
                }}
              >
                {/* <PopupVehicleMarker vehicle={vehicle} handleClickOpen={handleClickOpenVehicle} /> */}
              </RotatedMarker>
            ))}

            {!!bins && bins.map((bin) => (
              <RotatedMarker key={bin.id} position={[bin.latitude, bin.longitude]} icon={bin.status === "full" ? iconBinRed : bin.status === "empty" ? iconBinGreen : iconBinYellow}
                eventHandlers={{
                  click: (e) => {
                    if (itemBin?.id?.toString() === bin?.id?.toString()) {
                      return handleCloseBin(e)
                    }
                    return handleClickOpenBin(e, bin)
                  }
                }}
              >
                {/* <PopupBinMarker bin={bin} handleClickOpen={handleClickOpenBin} /> */}

              </RotatedMarker>
            ))}
            {(waypoints.hideInMap === true && kb === kb2) && <RotatedMarker position={[20.981227, 105.787763]} icon={iconChan} />}
            {(waypoints.hideInMap === true) && <Routing dataWaypoints={waypoints.data}></Routing>}
            {(waypoints.hideInMap === true) && <Polyline pathOptions={{color: 'red'}} positions={kb} />}
            <ZoomHandler waypoints={waypoints} ></ZoomHandler>
          </MapContainer>
        </Box>
        <TabPanelItemBin open={openBin} handleClose={handleCloseBin} item={itemBin} ></TabPanelItemBin>
        <TabPanelVehicle open={openVehicle} handleClose={handleCloseVehicle} item={itemVehicle} listRoutes={itemListRoutes} ></TabPanelVehicle>
      </Box>
    </Fragment>
  )
}


export default Map1