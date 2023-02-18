import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  setLoading,
setInitDataDepartment,
  // setInitDataCourse
} from 'src/actions/miscActions';

// import useSelector from 'src/utils/useSelector';

import { useIsFocused } from "@react-navigation/native";
export interface propsType {
  navigation: any;
  route: any;
}

const RoleBaseNavigation = (props: propsType) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  // const profile = useSelector(state => state.misc.profile);

  useEffect(() => {
    dispatch(setLoading(true));

    // const ROLE_CAN_SELECT_DEPARTMENT = [
      // 'dx_manager',
    // ];

    // const ROLE = profile.role_name;
    // const DEPARTMENT = profile.department_code;

    // if (ROLE_CAN_SELECT_DEPARTMENT.includes(ROLE)) {
    dispatch(setInitDataDepartment(true));

    props.navigation.jumpTo('Base');
    // } else {
    //   dispatch(setInitDataCourse(true));
      
    //   props.navigation.jumpTo('Course', { base_id: DEPARTMENT });
    // }

    dispatch(setLoading(false));
  }, [isFocused, props]);

  return (
    <>
    </>
  );
};

export default RoleBaseNavigation;