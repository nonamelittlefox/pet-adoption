import React, { useEffect } from "react";

// import Maintenance from "./index";
// import MaintenanceSchedule from "./maintenanceSchedule";

import { useDispatch } from 'react-redux';
import useSelector from 'src/utils/useSelector';

import { useIsFocused } from "@react-navigation/native";

import { setLoading, setInitDataDepartment, setInitDataScheduleMaintenance } from 'src/actions/miscActions';

const DirectPermissionMaintenance = ({ navigation }) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const profile = useSelector(state => state.misc.profile);

  useEffect(() => {
    dispatch(setLoading(true));

    console.log('Navigation: ', navigation);
    console.log('Profile: ', profile);

    const ROLE_CAN_NOT_ACCESS = [
      'crew',
      'clerks',
      'tl',
    ];

    const ROLE = profile.role_name;
    const DEPARTMENT = profile.department_code;

    if (!(ROLE_CAN_NOT_ACCESS.includes(ROLE))) {
      dispatch(setInitDataDepartment(true));
      dispatch(setInitDataScheduleMaintenance(true));

      console.log('Can access');
      navigation.jumpTo('TrackMaintenance');
    } else {
      dispatch(setInitDataDepartment(true));
      dispatch(setInitDataScheduleMaintenance(true));
      
      console.log('Can not access');
      navigation.jumpTo('MaintenanceSchedule', { base_id: DEPARTMENT });
    }

    dispatch(setLoading(false));
  }, [isFocused, navigation]);

  return (
    <>
    </>
  );
};

export default DirectPermissionMaintenance;