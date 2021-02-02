<?php if (! defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Services_model extends CI_Model {
    public function __construct() {
        parent::__construct();
    }

    public function addinternet($item) {

        $idClientServicesFk = $this->insertService($item, 'tb_client_services_internet', 'idClientServicesInternet');  // CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_internet', [
                'idClientServicesFk'     => $idClientServicesFk,
                'idTypeInternetFk'       => $item['idTypeInternetFk'],
                'idTypeMaintenanceFk'    => $item['idTypeMaintenanceFk'], //
                'idServiceFk'            => $item['idServiceFk'],
                'idServiceAsociateFk'    => $item['idServiceAsociateFk'],
                'idRouterInternetFk'     => $item['idRouterInternetFk'],
                //'numberSeria'            => $item['numberSeria'],
                'userAdmin'              => $item['userAdmin'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'idInternetCompanyFk'    => $item['idInternetCompanyFk'],
                'idModemInternetFk'      => $item['idModemInternetFk'],
                'dateDown'               => $item['dateDown'],
                'dateUp'                 => $item['dateUp'],
                'isDown'                 => $item['isDown'],
                'port'                   => $item['port'],
                'passAdmin'              => $item['passAdmin'],
                "userWifi"               => $item['userWifi'],
                "passWifi"               => $item['passWifi'],
                "macAddress"             => $item['macAddress'],
                "numberLine"             => $item['numberLine'],
                "numberChip"             => $item['numberChip'],
                //'nroSerieInternal'       => $item['nroSerieInternal'],
                //'nroSerieManufacturer'   => $item['nroSerieManufacturer'],
            ]
        );


        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editInternet($item) {

        $this->db->set(
            [
                'idTypeInternetFk'       => $item['idTypeInternetFk'],
                'idTypeMaintenanceFk'    => $item['idTypeMaintenanceFk'],
                'idServiceFk'            => $item['idServiceFk'],
                'idServiceAsociateFk'    => $item['idServiceAsociateFk'],
                'idRouterInternetFk'     => $item['idRouterInternetFk'],
                'userAdmin'              => $item['userAdmin'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'idInternetCompanyFk'    => $item['idInternetCompanyFk'],
                'idModemInternetFk'      => $item['idModemInternetFk'],
                'dateDown'               => $item['dateDown'],
                'dateUp'                 => $item['dateUp'],
                'isDown'                 => $item['isDown'],
                'port'                   => $item['port'],
                'passAdmin'              => $item['passAdmin'],
                "userWifi"               => $item['userWifi'],
                "passWifi"               => $item['passWifi'],
                "macAddress"             => $item['macAddress'],
                "numberLine"             => $item['numberLine'],
                "numberChip"             => $item['numberChip'],
            ]
        )->where("idClientServicesInternet", $item['idClientServicesInternet'])->update("tb_client_services_internet");

        $data = $this->db->select(" idClientServicesFk ")
            ->from('tb_client_services_internet')
            ->where("idClientServicesInternet", $item['idClientServicesInternet'])
            ->get();
        $idClientServicesFk;
        if ($data->num_rows() > 0) {
            $idClientServicesFk = $data->result_array()[0]['idClientServicesFk'];
        }

        if (isset($item['adicional'])) {
            $this->db->delete('tb_detalles_control_acceso', [ 'idServicesFk' => $item['idClientServicesInternet'] ]);
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }


        return true;

    }

    public function addgps($item) {
        $idClientServicesFk = $this->insertService($item, 'tb_client_services_gps', 'idClientServicesGps');// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_gps', [
                'idClientServicesFk'     => $idClientServicesFk,
                'idTypeGpsFk'            => $item['idTypeGpsFk'],
                'typeMaintenance'        => $item['typeMaintenance'],
                'dateUp'                 => $item['dateUp'],
                'dateDown'               => $item['dateDown'],
                'modem'                  => $item['modem'],
                'idInternetCompanyFk'    => $item['idInternetCompanyFk'], //empresa
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'nroLine'                => $item['nroLine'],
                'nroChip'                => $item['nroChip'],
                'idServiceAsociateFk'    => $item['idServiceAsociateFk'],
                'nroSerieInternal'       => $item['nroSerieInternal'],
                'nroSerieManufacturer'   => $item['nroSerieManufacturer'],
            ]
        );
        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }


        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addaccescontrol($item) {

        $idClientServicesFk = $this->insertService($item, 'tb_client_services_access_control', 'idClientServicesAccessControl'); // CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_access_control', [
                'idClientServicesFk'     => $idClientServicesFk,
                'idDoorFk'               => $item['idDoorFk'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'dateUp'                 => $item['dateUp'],
                'dateDown'               => $item['dateDown'],
                'idAccessControlFk'      => $item['idAccessControlFk'],
                'idInputReaderFk'        => $item['idInputReaderFk'],
                'locationGabinet'        => $item['locationGabinet'],
                'idFontFk'               => $item['idFontFk'],
                'aclaration'             => $item['aclaration'],
                'idTypeMaintenanceFk'    => $item['idTypeMaintenanceFk'],
                'lock'                   => $item['lock'],
                'ouputReader'            => $item['ouputReader'],
                'ouputButom'             => $item['ouputButom'],
                'isOuputReader'          => $item['isOuputReader'],
                'isOuputButom'           => $item['isOuputButom'],
                'isBlocklingScrew'       => $item['isBlocklingScrew'],
                'idEmergencyButtonFk'    => $item['idEmergencyButtonFk'],
                'idShutdownKeyFk'        => $item['idShutdownKeyFk'],
                'acaration2'             => $item['acaration2'],
                //'address'                => $item['address'],
                //'addressLat'             => $item['addressLat'],
                //'addressLon'             => $item['addressLon'],
                'portNumberRouter'       => $item['portNumberRouter'],
                'addressClient'          => $item['addressClient'],
                'addressVpn'             => $item['addressVpn'],
                //'addressClientLat'       => $item['addressClientLat'],
                //'addressClientLon'       => $item['addressClientLon'],
                'user'                   => $item['user'],
                'useVpn'                 => $item['useVpn'],
                'passVpn'                => $item['passVpn'],
                'pass'                   => $item['pass'],
                'portHttp'               => $item['portHttp'],

                'locationEmergencyButton' => $item['locationEmergencyButton'],
                'locationOffKey'          => $item['locationOffKey'],

            ]
        );


        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (count($item['battery_install']) > 0) {
            $this->insertServiceBatteryAccessControl($item['battery_install'], $id);  //se crean las baterias
        }
        //$id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editAccescontrol($item) {

        //$idClientServicesFk = $this->insertService($item, 'tb_client_services_access_control', 'idClientServicesAccessControl'); // CREAMOS EL SERVICIO

        $this->db->set(
            [
                'idDoorFk'                => $item['idDoorFk'],
                'idContracAssociated_SE'  => $item['idContracAssociated_SE'],
                'dateUp'                  => $item['dateUp'],
                'dateDown'                => $item['dateDown'],
                'idAccessControlFk'       => $item['idAccessControlFk'],
                'idInputReaderFk'         => $item['idInputReaderFk'],
                'locationGabinet'         => $item['locationGabinet'],
                'idFontFk'                => $item['idFontFk'],
                'aclaration'              => $item['aclaration'],
                'idTypeMaintenanceFk'     => $item['idTypeMaintenanceFk'],
                'lock'                    => $item['lock'],
                'ouputReader'             => $item['ouputReader'],
                'ouputButom'              => $item['ouputButom'],
                'isOuputReader'           => $item['isOuputReader'],
                'isOuputButom'            => $item['isOuputButom'],
                'isBlocklingScrew'        => $item['isBlocklingScrew'],
                'idEmergencyButtonFk'     => $item['idEmergencyButtonFk'],
                'idShutdownKeyFk'         => $item['idShutdownKeyFk'],
                'acaration2'              => $item['acaration2'],
                'portNumberRouter'        => $item['portNumberRouter'],
                'addressClient'           => $item['addressClient'],
                'addressVpn'              => $item['addressVpn'],
                'user'                    => $item['user'],
                'useVpn'                  => $item['useVpn'],
                'passVpn'                 => $item['passVpn'],
                'pass'                    => $item['pass'],
                'portHttp'                => $item['portHttp'],
                'locationEmergencyButton' => $item['locationEmergencyButton'],
                'locationOffKey'          => $item['locationOffKey'],
            ]
        )->where("idClientServicesAccessControl", $item['idClientServicesAccessControl'])->update("tb_client_services_access_control");

        $data = $this->db->select("idClientServicesFk")
            ->from('tb_client_services_access_control')
            ->where("idClientServicesAccessControl", $item['idClientServicesAccessControl'])
            ->get();

        $id = 0;
        if ($data->num_rows() > 0) {
            $id = $data->result_array()[0]['idClientServicesFk'];
        }

        if ($id == 0) {
            return 0;
        }

        if (count($item['battery_install']) > 0) {
            $this->insertServiceBatteryAccessControl($item['battery_install'], $item['idClientServicesAccessControl'], true);  //se crean las baterias
        }

        if (isset($item['adicional'])) {
            $this->db->delete('tb_detalles_control_acceso', [ 'idServicesFk' => $id ]);
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        return true;
    }

    public function addsmartpanic($item) {

        $idClientServicesFk = $this->insertService($item, 'tb_client_services_smart_panic', 'idClientServicesSmartPanic'); // CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_smart_panic', [
                'idClientServicesFk'      => $idClientServicesFk,
                'name'                    => $item['name'],
                'idContracAssociated_SE'  => $item['idContracAssociated_SE'],
                'dateUp'                  => $item['dateUp'],
                'dateDown'                => $item['dateDown'],
                'idTypeMaintenanceFk'     => $item['idTypeMaintenanceFk'],
                'idCompanyMonitorFK'      => $item['idCompanyMonitorFK'],
                'sucribeNumber'           => $item['sucribeNumber'],
                'idDetinationOfLicenseFk' => $item['idDetinationOfLicenseFk'],
                'idDepartmentFk'          => $item['idDepartmentFk'],
                'idParticularAddressFk'   => $item['idParticularAddressFk'],
                'countNewLicense'         => $item['countNewLicense'],
                'observation'             => $item['observation'],
            ]
        );
        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        $this->insertLicence($item['licenses'], $id);

        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editSmartpanic($item) {

        //$idClientServicesFk = $this->insertService($item, 'tb_client_services_smart_panic', 'idClientServicesSmartPanic'); // CREAMOS EL SERVICIO


        $this->db->set(
            [
                'name'                    => $item['name'],
                'idContracAssociated_SE'  => $item['idContracAssociated_SE'],
                'dateUp'                  => $item['dateUp'],
                'dateDown'                => $item['dateDown'],
                'idTypeMaintenanceFk'     => $item['idTypeMaintenanceFk'],
                'idCompanyMonitorFK'      => $item['idCompanyMonitorFK'],
                'sucribeNumber'           => $item['sucribeNumber'],
                'idDetinationOfLicenseFk' => $item['idDetinationOfLicenseFk'],
                'idDepartmentFk'          => $item['idDepartmentFk'],
                'countNewLicense'         => $item['countNewLicense'],
                'observation'             => $item['observation'],
            ]
        )->where("idClientServicesSmartPanic", $item['idClientServicesSmartPanic'])->update("tb_client_services_smart_panic");

        $data = $this->db->select("idClientServicesFk")
            ->from('tb_client_services_smart_panic')
            ->where("idClientServicesSmartPanic", $item['idClientServicesSmartPanic'])
            ->get();

        //return $data;

        $id = 0;
        if ($data->num_rows() > 0) {
            //return $data->result_array();
            $id = $data->result_array()[0]['idClientServicesFk'];
        }
        if ($id == 0) {
            return 0;
        }

        //$id = $this->db->insert_id();
        //$this->updatedService($idClientServicesFk, $id);

        $this->insertLicence($item['licenses'], $item['idClientServicesSmartPanic'], true);

        if (isset($item['adicional'])) {
            $this->db->delete('tb_detalles_control_acceso', [ 'idServicesFk' => $id ]);
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addcamera($item) {
        $idClientServicesFk = $this->insertService($item, 'tb_client_services_camera', 'idClientServicesCamera'); //CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_camera', [
                'name'                   => $item['name'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'idTypeMaintenanceFk'    => $item['idTypeMaintenanceFk'],
                'dateUp'                 => $item['dateUp'],
                'dateDown'               => $item['dateDown'],
                'idDvr_nvrFk'            => $item['idDvr_nvrFk'],
                'location'               => $item['location'],
                'maxCamera'              => $item['maxCamera'],
                'numberPortRouter'       => $item['numberPortRouter'],
                'addressVpn'             => $item['addressVpn'],
                'nroPort1'               => $item['nroPort1'],
                'nroPort2'               => $item['nroPort2'],
                'namePort1'              => $item['namePort1'],
                'namePort2'              => $item['namePort2'],
                'observation'            => $item['observation'],
                'addessClient'           => $item['addessClient'],
                'portHttp'               => $item['portHttp'],
                'namePort'               => $item['namePort'],
                'port'                   => $item['port'],
                'idClientServicesFk'     => $idClientServicesFk,
            ]
        );

        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (count($item['clients']) > 0) {
            $this->insertServiceUser($item['clients'], $id);  //se crean los usuarios dvr
        }
        if (count($item['cameras']) > 0) {
            $this->insertServiceCamera($item['cameras'], $id); //CREAMOS las camaras
        }
        if (count($item['backup_energy']) > 0) {
            $this->insertServiceEnergy($item['backup_energy'], $id); //CREAMOS las opciones de energia
        }
        $id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editCamera($item) {
        //$idClientServicesFk = $this->insertService($item, 'tb_client_services_camera', 'idClientServicesCamera'); //CREAMOS EL SERVICIO

        $this->db->set(
            [
                'name'                   => $item['name'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'idTypeMaintenanceFk'    => $item['idTypeMaintenanceFk'],
                'dateUp'                 => $item['dateUp'],
                'dateDown'               => $item['dateDown'],
                'idDvr_nvrFk'            => $item['idDvr_nvrFk'],
                'location'               => $item['location'],
                'maxCamera'              => $item['maxCamera'],
                'numberPortRouter'       => $item['numberPortRouter'],
                'addressVpn'             => $item['addressVpn'],
                'nroPort1'               => $item['nroPort1'],
                'nroPort2'               => $item['nroPort2'],
                'namePort1'              => $item['namePort1'],
                'namePort2'              => $item['namePort2'],
                'observation'            => $item['observation'],
                'addessClient'           => $item['addessClient'],
                'portHttp'               => $item['portHttp'],
                'namePort'               => $item['namePort'],
                'port'                   => $item['port'],
            ]
        )->where("idClientServicesCamera", $item['idClientServicesCamera'])->update("tb_client_services_camera");

        $data = $this->db->select("idClientServicesFk")
            ->from('tb_client_services_camera')
            ->where("idClientServicesCamera", $item['idClientServicesCamera'])
            ->get();

        //return $data;

        $id = 0;
        if ($data->num_rows() > 0) {
            //return $data->result_array();
            $id = $data->result_array()[0]['idClientServicesFk'];
        }
        if ($id == 0) {
            return 0;
        }

        if (count($item['clients']) > 0) {
            $this->insertServiceUser($item['clients'], $item['idClientServicesCamera'], true);  //se crean los usuarios dvr
        }
        if (count($item['cameras']) > 0) {
            $this->insertServiceCamera($item['cameras'], $item['idClientServicesCamera'], true); //CREAMOS las camaras
        }
        if (count($item['backup_energy']) > 0) {
            $this->insertServiceEnergy($item['backup_energy'], $item['idClientServicesCamera'], true); //CREAMOS las opciones de energia
        }

        if (isset($item['adicional'])) {
            $this->db->delete('tb_detalles_control_acceso', [ 'idServicesFk' => $id ]);
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addTotem($item) {

        //$this->insertServiceUser($item);
        $idClientServicesFk = $this->insertService($item, 'tb_client_services_totem', 'idClientServicesTotem'); // CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_totem', [
                'name'                   => $item['name'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'dateUp'                 => $item['dateUp'],
                'idCompanyFk'            => $item['idCompanyFk'],
                'idDvr_nvrFk'            => $item['idDvr_nvrFk'],
                'addessClient'           => $item['addessClient'],
                'maxCamera'              => $item['maxCamera'],
                'idTotenModelFk'         => $item['idTotenModelFk'],
                'tipeMaintenance_SE'     => $item['idTypeMaintenanceFk'],
                'dateDown'               => $item['dateDown'],
                'numberPortRouter'       => $item['numberPortRouter'],
                'addreesVpn'             => $item['addressVpn'],
                'namePort1'              => $item['namePort1'],
                'numberPort1'            => $item['nroPort1'],
                'namePort2'              => $item['namePort2'],
                'numberPort2'            => $item['nroPort2'],
                'addressClientInter'     => $item['addessClient'],
                'portHttpInter'          => $item['portHttp'],
                'namePortInter'          => $item['namePort'],
                'numberPortInter'        => $item['port'],
                'observation'            => $item['observation'],
                'numberAbonado'          => $item['numberAbonado'],
                'idClientServicesFk'     => $idClientServicesFk,
            ]
        );

        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (count($item['clients']) > 0) {
            $this->insertServiceUserTotem($item['clients'], $id);  //se crean los usuarios
        }
        if (count($item['cameras']) > 0) {
            $this->insertServiceCameraTotem($item['cameras'], $id); //CREAMOS las camaras
        }
        if (count($item['backup_energy']) > 0) {
            $this->insertServiceEnergyTotem($item['backup_energy'], $id); //CREAMOS las opciones de energia
        }

        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $idClientServicesFk,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editTotem($item) {

        $this->db->set(
            [
                'name'                   => $item['name'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'dateUp'                 => $item['dateUp'],
                'idCompanyFk'            => $item['idCompanyFk'],
                'idDvr_nvrFk'            => $item['idDvr_nvrFk'],
                'addessClient'           => $item['addessClient'],
                'maxCamera'              => $item['maxCamera'],
                'idTotenModelFk'         => $item['idTotenModelFk'],
                'tipeMaintenance_SE'     => $item['idTypeMaintenanceFk'],
                'dateDown'               => $item['dateDown'],
                'numberPortRouter'       => $item['numberPortRouter'],
                'addreesVpn'             => $item['addressVpn'],
                'namePort1'              => $item['namePort1'],
                'numberPort1'            => $item['nroPort1'],
                'namePort2'              => $item['namePort2'],
                'numberPort2'            => $item['nroPort2'],
                'addressClientInter'     => $item['addessClient'],
                'portHttpInter'          => $item['portHttp'],
                'namePortInter'          => $item['namePort'],
                'numberPortInter'        => $item['port'],
                'observation'            => $item['observation'],
                'numberAbonado'          => $item['numberAbonado'],
            ]
        )->where("idClientServicesTotem", $item['idClientServicesTotem'])->update("tb_client_services_totem");


        //$id = $this->db->insert_id();
        //$this->updatedService($idClientServicesFk, $id);

        $data = $this->db->select("idClientServicesFk")
            ->from('tb_client_services_totem')
            ->where("idClientServicesTotem", $item['idClientServicesTotem'])
            ->get();

        //return $data;

        $id = 0;
        if ($data->num_rows() > 0) {
            //return $data->result_array();
            $id = $data->result_array()[0]['idClientServicesFk'];
        }
        if ($id == 0) {
            return 0;
        }


        if (count($item['clients']) > 0) {
            $this->insertServiceUserTotem($item['clients'], $item['idClientServicesTotem'], true);  //se crean los usuarios
        }
        if (count($item['cameras']) > 0) {
            $this->insertServiceCameraTotem($item['cameras'], $item['idClientServicesTotem'], true); //CREAMOS las camaras
        }
        if (count($item['backup_energy']) > 0) {
            $this->insertServiceEnergyTotem($item['backup_energy'], $item['idClientServicesTotem'], true); //CREAMOS las opciones de energia
        }

        if (isset($item['adicional'])) {
            $this->db->delete('tb_detalles_control_acceso', [ 'idServicesFk' => $id ]);
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
                        "optAux"              => @$item1['optAux'],
                    ]
                );
            }
        }

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function insertServiceUser($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_client_camera', [ 'idClientServicesCameraFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_client_camera', [
                    'idClientFk'               => isset($item['idClientFk']) ? $item['idClientFk'] : null,
                    "idClientServicesCameraFk" => $id,
                    'name'                     => $item['name'],
                    'user'                     => $item['user'],
                    'pass'                     => $item['pass'],
                    'userProfile'              => @$item['userProfile'],
                    'qrBase64'                 => @$item['qrBase64'],
                ]
            );
        }

        return true;
    }

    public function insertServiceUserTotem($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_client_totem', [ 'idClientServicesTotemFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_client_totem', [
                    'idClientFk'              => isset($item['idClientFk']) ? $item['idClientFk'] : null,
                    "idClientServicesTotemFk" => $id,
                    'name'                    => $item['name'],
                    'user'                    => $item['user'],
                    'pass'                    => $item['pass'],
                    'userProfile'             => @$item['userProfile'],
                    'qrBase64'                => @$item['qrBase64'],
                ]
            );
        }

        return true;
    }

    public function insertServiceBatteryAccessControl($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_battery_install_access_control', [ 'idClientServicesAccessControlFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_battery_install_access_control', [
                    "idClientServicesAccessControlFk" => $id,
                    "idBatteryFk"                     => $item["idBatteryFk"],
                ]
            );
        }

        return true;
    }

    public function insertService($product, $nameDataBase, $nameId) {
        $this->db->insert('tb_client_services', [
                'idClientFk'      => $product['idClientFk'],
                'idTipeServiceFk' => $product['idTipeServiceFk'],
                'nameDataBase'    => $nameDataBase,
                'nameId'          => $nameId,
            ]
        );

        return $this->db->insert_id();
    }

    public function updatedService($idClientServices, $idServicesFk) {
        $this->db->set(
            [
                'idServicesFk' => $idServicesFk,
            ]
        )->where("idClientServices", $idClientServices)->update("tb_client_services");

        return $this->db->insert_id();
    }

    public function insertServiceCamera($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_cameras', [ 'idClientServicesCameraFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_cameras', [
                    "idClientServicesCameraFk" => $id,
                    "portCamera"               => $item['portCamera'],
                    "coveredArea"              => $item['coveredArea'],
                    "locationCamera"           => $item['locationCamera'],
                    "nroSerieCamera"           => $item['nroSerieCamera'],
                    "nroFabricCamera"          => $item['nroFabricCamera'],
                    "dateExpireCamera"         => $item['dateExpireCamera'],
                    "idProductFk"              => $item['idProductFk'],
                ]
            );
        }

        return true;
    }

    public function insertServiceCameraTotem($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_cameras_totem', [ 'idClientServicesCameraTotemFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_cameras_totem', [
                    "idClientServicesCameraTotemFk" => $id,
                    "portCamera"                    => $item['portCamera'],
                    "coveredArea"                   => $item['coveredArea'],
                    "locationCamera"                => $item['locationCamera'],
                    "nroSerieCamera"                => $item['nroSerieCamera'],
                    "nroFabricCamera"               => $item['nroFabricCamera'],
                    "dateExpireCamera"              => $item['dateExpireCamera'],
                    "idProductFk"                   => $item['idProductFk'],
                ]
            );
        }

        return true;
    }

    public function insertServiceEnergy($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_backup_energy', [ 'idClientServicesFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_backup_energy', [
                    "idClientServicesFk" => $id,
                    "description"        => $item['description'],
                    "idBatteryFk"        => $item['idBatteryFk'],
                ]
            );
        }

        return true;
    }

    public function insertServiceEnergyTotem($product, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_backup_energy_totem', [ 'idClientServicesTotemFk' => $id ]);
        }
        foreach ($product as $item) {
            $this->db->insert('tb_backup_energy_totem', [
                    "idClientServicesTotemFk" => $id,
                    "description"             => $item['description'],
                    "idBatteryFk"             => $item['idBatteryFk'],
                ]
            );
        }

        return true;
    }

    public function insertLicence($items, $id, $borrar = false) {
        if ($borrar) {
            $this->db->delete('tb_user_license', [ 'idClientServicesSmartPanicFk' => $id ]);
        }
        foreach ($items as $item) {
            $this->db->insert('tb_user_license', [
                    "fullName"                     => $item['fullName'],
                    "email"                        => $item['email'],
                    "phone"                        => $item['phone'],
                    "keyword"                      => $item['keyword'],
                    "idOS"                         => $item['idOS'],
                    "profileUser"                  => $item['profileUser'],
                    "idClientServicesSmartPanicFk" => $id,
                ]
            );
        }


        $id  = $this->db->insert_id();
        $res = null;

        if ($this->db->affected_rows() === 1) {
            $res = 1;
        } else {
            $res = 0;
        }

        return json_encode([ 'id' => $id, 'res' => $res ]);
    }

    public function getServicesPorIdContrato($idContrato) {

        /*se definen todas las tablas de los servicios*/
        $tablas     = [
            "access_control" => "tb_client_services_access_control",
            "internet"       => "tb_client_services_internet",
            "totem"          => "tb_client_services_totem",
            "camera"         => "tb_client_services_camera",
            "alarms"         => "tb_client_services_alarms",
            "smart_panic"    => "tb_client_services_smart_panic",
        ];
        $relaciones = [
            'tb_client_services_access_control' => [
                'idDoorFk'            => [ 'tb_access_control_door', 'idAccessControlDoor' ],
                'idAccessControlFk'   => [ 'tb_products', 'idProduct' ],
                'idInputReaderFk'     => [ 'tb_products', 'idProduct' ],
                'idTypeMaintenanceFk' => [ 'tb_products', 'idProduct' ],
                'idEmergencyButtonFk' => [ 'tb_products', 'idProduct' ],
                'idShutdownKeyFk'     => [ 'tb_products', 'idProduct' ],
                //'idClientServicesFk'  => [ 'tb_clients', 'idClient' ],
                'ouputReader'         => [ 'tb_products', 'idProduct' ],
                'ouputButom'          => [ 'tb_products', 'idProduct' ],
                'lock'                => [ 'tb_products', 'idProduct' ],
                'idBatteryFk'         => [ 'tb_products', 'idProduct' ],

            ],
            'tb_client_services_internet'       => [
                'idClientServicesFk'     => [ 'tb_clients', 'idClient' ],
                'idTypeInternetFk'       => [ 'tb_tipos_servicios_internet', 'idTipoServicioInternet' ],
                'idServiceFk'            => [ 'tb_type_internet', 'idTypeInternet' ],
                'idServiceAsociateFk'    => [ 'tb_client_services', 'idClientServices' ],
                'idRouterInternetFk'     => [ 'tb_products', 'idProduct' ],
                'idModemInternetFk'      => [ 'tb_products', 'idProduct' ],
                'idContracAssociated_SE' => [ 'tb_contratos', 'idContrato' ],
                'idInternetCompanyFk'    => [ 'tb_internet_company', 'idInternetCompany' ],
            ],
            'tb_client_services_totem'          => [
                'idClientServicesFk'     => [ 'tb_clients', 'idClient' ],
                'idContracAssociated_SE' => [ 'tb_contratos', 'idContrato' ],
                'idCompanyFk'            => [ 'tb_monitor_company', 'idMonitorCompany' ],
                'idTotenModelFk'         => [ 'tb_totem_model', 'idTotenModel' ],
                'fk'                     => [
                    [ 'tb_cameras_totem', 'idClientServicesCameraTotemFk' ],
                    [ 'tb_client_totem', 'idClientServicesTotemFk' ],
                    [ 'tb_backup_energy_totem', 'idClientServicesTotemFk' ],
                ],
            ],
            'tb_client_services_camera'         => [
                'idContracAssociated_SE' => [ 'tb_contratos', 'idContrato' ],
                'idTypeMaintenanceFk'    => [ 'tb_type_maintenance', 'idTypeMaintenance' ],
                'idDvr_nvrFk'            => [ 'tb_products', 'idProduct' ],
                'fk'                     => [
                    [ 'tb_cameras', 'idClientServicesCameraFk' ],
                    [ 'tb_client_camera', 'idClientServicesCameraFk' ],
                    [ 'tb_backup_energy', 'idClientServicesFk' ],
                ],
            ],
            'tb_client_services_alarms'         => [
                'idContracAssociated_SE' => [ 'tb_contratos', 'idContrato' ],
                'companyMonitor'         => [ 'tb_monitor_company', 'idMonitorCompany' ],
                'idTypeMaintenanceFk'    => [ 'tb_type_maintenance', 'idTypeMaintenance' ],
                'alarmPanel'             => [ 'tb_products', 'idProduct' ],
                'alarmKeyboard'          => [ 'tb_products', 'idProduct' ],
                'fk'                     => [
                    [
                        [ 'tb_datos_adicionales_alarmas', 'fkidClientServicesAlarms' ],
                        'fk' => [
                            [ 'tb_franja_horaria_alarmas', 'fk_idDatoAdicionalAlarma' ],
                            [ 'tb_personas_para_dar_aviso_alarmas', 'fk_idDatoAdicionalAlarma' ],
                            [ 'tb_personas_para_verificar_en_lugar', 'fk_idDatoAdicionalAlarma' ],

                        ],

                    ],

                ],

            ],
            'tb_client_services_smart_panic'    => [
                'idClientServicesFk'      => [ 'tb_clients', 'idClient' ],
                'idContracAssociated_SE'  => [ 'tb_contratos', 'idContrato' ],
                'idTypeMaintenanceFk'     => [ 'tb_type_maintenance', 'idTypeMaintenance' ],
                'idCompanyMonitorFK'      => [ 'tb_monitor_company', 'idMonitorCompany' ],
                'idDetinationOfLicenseFk' => [ 'tb_detination_of_license', 'idDetinationOfLicense' ],
                'idDepartmentFk'          => [ 'tb_client_departament', 'idClientDepartament' ],
            ],

        ];

        $servicios = null;
        $array_axu = [];
        /*se recorre el arreglo de las tablas*/
        foreach ($tablas as $key => $tabla) {
            //return [$key,$tabla];

            $servicios = $this->db->select(" * ")
                ->from($tabla)
                ->join('tb_client_services', 'tb_client_services.idClientServices = '.$tabla.'.idClientServicesFk', 'LEFT')
                ->join('tb_client_type_services', 'tb_client_type_services.idClientTypeServices = tb_client_services.idTipeServiceFk', 'LEFT');

            if ($tabla == 'tb_client_services_access_control') {
                $servicios = $this->db->join('tb_access_control_door', 'tb_access_control_door.idAccessControlDoor = tb_client_services_access_control.idDoorFk', 'LEFT');
                $servicios = $this->db->join('tb_battery_install_access_control', 'tb_battery_install_access_control.idClientServicesAccessControlFk = tb_client_services_access_control.idClientServicesAccessControl', 'LEFT');
            }

            if ($tabla == 'tb_client_services_internet') {
                $servicios = $this->db->join('tb_tipos_servicios_internet', 'tb_tipos_servicios_internet.idTipoServicioInternet = tb_client_services_internet.idTypeInternetFk', 'LEFT');
            }
            $servicios = $this->db->where('idContracAssociated_SE', $idContrato);
            $servicios = $this->db->get();

            if ($servicios->num_rows() > 0) {
                foreach ($servicios->result_array() as $key => $item) {
                    foreach ($relaciones as $tabla1 => $data) {
                        foreach ($data as $id => $item3) {
                            if ($tabla == $tabla1) {
                                if ($tabla == "tb_client_services_camera" && $id == 'fk') {
                                    foreach ($data[$id] as $idFk => $item3Fk) {
                                        $dataG = $this->db->select(" * ")
                                            ->from($item3Fk[0])
                                            ->where($item3Fk[1], $item['idClientServicesCamera'])
                                            ->get();
                                        $aux   = [];
                                        if ($dataG->num_rows() > 0) {
                                            foreach ($dataG->result_array() as $ite2) {
                                                array_push($aux, $ite2);
                                            }
                                            $item[$item3Fk[0].'_array'] = $aux;
                                        }
                                    }

                                } else {
                                    if ($tabla == "tb_client_services_totem" && $id == 'fk') {
                                        foreach ($data[$id] as $idFk => $item3Fk) {
                                            $dataG = $this->db->select(" * ")
                                                ->from($item3Fk[0])
                                                ->where($item3Fk[1], $item['idClientServicesTotem'])
                                                ->get();
                                            $aux   = [];
                                            if ($dataG->num_rows() > 0) {
                                                foreach ($dataG->result_array() as $ite2) {
                                                    array_push($aux, $ite2);
                                                }
                                                $item[$item3Fk[0].'_array'] = $aux;
                                            }
                                        }

                                    } else {
                                        //$ar = [];
                                        if ($tabla == "tb_client_services_alarms" && $id == 'fk') {
                                            foreach ($data[$id] as $idFk => $item3Fk) {
                                                foreach ($item3Fk as $idFk2 => $item3Fk2) {

                                                    //array_push($ar, $idFk2);


                                                    if ($idFk2 === "fk") {
                                                        foreach ($item3Fk[$idFk2] as $idFk3 => $item3Fk3) {

                                                            $dataG = $this->db->select(" * ")
                                                                ->from($item3Fk3[0])
                                                                ->where($item3Fk3[1], $item['idClientServicesAlarms'])
                                                                ->get();
                                                            //return $dataG;
                                                            $aux = [];
                                                            if ($dataG->num_rows() > 0) {
                                                                foreach ($dataG->result_array() as $ite2) {
                                                                    array_push($aux, $ite2);
                                                                }
                                                                $item[$item3Fk3[0].'_array'] = $aux;
                                                            }
                                                        }
                                                    } else {
                                                        $dataG = $this->db->select(" * ")
                                                            ->from($item3Fk2[0])
                                                            ->where($item3Fk2[1], $item['idClientServicesAlarms'])
                                                            ->get();
                                                        //return $dataG;
                                                        $aux = [];
                                                        if ($dataG->num_rows() > 0) {
                                                            foreach ($dataG->result_array() as $ite2) {
                                                                array_push($aux, $ite2);
                                                            }
                                                            $item[$item3Fk2[0].'_array'] = $aux;
                                                        }
                                                    }
                                                }


                                                //return $ar;
                                            }

                                        } else {
                                            $dataG = $this->db->select(" * ")
                                                ->from($item3[0])
                                                ->where($item3[1], $item[$id])
                                                ->get();
                                            $aux   = [];
                                            if ($dataG->num_rows() > 0) {
                                                foreach ($dataG->result_array() as $ite2) {
                                                    array_push($aux, $ite2);
                                                }
                                                $item[$id.'_array'] = $aux;
                                            }
                                        }

                                    }
                                }


                            }
                        }
                    }

                    // if ($tabla == 'tb_client_services_access_control') {
                    //     $idTipeServiceFk = $this->db->select(" * ")
                    //         ->from('tb_products')
                    //         ->where('idProduct', $item['idAccessControlFk'])
                    //         ->get();
                    //     $aux             = [];
                    //
                    //     if ($idTipeServiceFk->num_rows() > 0) {
                    //         foreach ($idTipeServiceFk->result_array() as $ite2) {
                    //             array_push($aux, $ite2);
                    //         }
                    //         $item['idTipeServiceFk_array'] = $aux;
                    //
                    //     }
                    // }

                    array_push($array_axu, $item);
                }

            }
        }

        return $array_axu;

    }

    public function getServicesPorIdCliente($idClientFk) {

        /*se definen todas las tablas de los servicios*/
        $tablas    = [
            "access_control" => "tb_client_services_access_control",
            "internet"       => "tb_client_services_internet",
            "totem"          => "tb_client_services_totem",
            "camera"         => "tb_client_services_camera",
            //"alarms"         => "tb_client_services_alarms",
            "smart_panic"    => "tb_client_services_smart_panic",
        ];
        $pivotes   = null;
        $array_axu = [];
        /*se recorre el arreglo de las tablas*/

        $pivotes = $this->db->select(" * ")
            ->from('tb_client_services')
            ->where('idClientFk', $idClientFk)
            ->join('tb_client_type_services', 'tb_client_type_services.idClientTypeServices = tb_client_services.idTipeServiceFk', 'LEFT')
            ->get();

        $r = null;
        if ($pivotes->num_rows() > 0) {
            $r = $pivotes->result_array();
            foreach ($r as $key => $pivote) {
                //buscando el servicio
                if (! is_null($pivote['nameDataBase']) && ! is_null($pivote['nameId']) && ! is_null($pivote['idServicesFk'])) {
                    //return $pivote;
                    $servicios = $this->db->select(" * ")
                        ->from($pivote['nameDataBase'])
                        ->where($pivote['nameId'], $pivote['idServicesFk']);


                    if ($pivote['nameDataBase'] == 'tb_client_services_access_control') {
                        $servicios = $this->db->join('tb_access_control_door', 'tb_access_control_door.idAccessControlDoor = tb_client_services_access_control.idDoorFk', 'LEFT');
                    }

                    if ($pivote['nameDataBase'] == 'tb_client_services_internet') {
                        $servicios = $this->db->join('tb_tipos_servicios_internet', 'tb_tipos_servicios_internet.idTipoServicioInternet = tb_client_services_internet.idTypeInternetFk', 'LEFT');
                    }
                    $servicios = $this->db->get();

                    // $clientes = $this->db->select(" * ")
                    //     ->from('tb_clients')
                    //     ->where('idClient', $pivote['idClientFk'])
                    //     ->get();
                    // return $servicios;

                    if ($servicios->num_rows() > 0) {
                        $r[$key]['service'] = $servicios->result_array();
                    }
                    // if ($clientes->num_rows() > 0) {
                    //     $r[$key]['client'] = $clientes->result_array();
                    // }
                }

            }
        }

        return $r;

    }


    /*
    public function update($product) {

        $this->db->set(
                array(
                    'descriptionProduct' => $product['descriptionProduct'] ,
                    'codigoFabric' => $product['codigoFabric'] ,
                    'brand' => $product['brand'] ,
                    'model' => $product['model'] ,
                    'idProductClassificationFk' => $product['idProductClassificationFk'],
                    'isNumberSerieFabric' => $product['isNumberSerieFabric'] ,
                    'isNumberSerieInternal' => $product['isNumberSerieInternal'] ,
                    'isDateExpiration' => $product['isDateExpiration'] ,
                    'isControlSchedule' => $product['isControlSchedule'] ,
                    'priceFabric' => $product['priceFabric']
                )
        )->where("idProduct", $product['idProduct'])->update("tb_products");

            if($product['idProductClassificationFk']==3){
                if(count(@$product['list_id_divice']) > 0)
                    {
                        $this->db->delete('tb_products_divice_opening', array('idProductFk' => $product['idProduct']));

                        foreach ($product['list_id_divice'] as $valor) {

                            $this->db->insert('tb_products_divice_opening', array(
                                'idProductFk' => $product['idProduct'],
                                'idDiviceOpeningFk' => $valor['idDiviceOpeningFk'])
                            );
                        }
                        return true;
                    }
            }else{
                return true;
            }

    }

    public function delete($idProduct) {

        $this->db->set(
            array('idStatusFk' =>  -1))->where("idProduct", $idProduct)->update("tb_products");
        return true;


    }

    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        if (!is_null($id))
        {

            $this->db->select(" * ")->from("tb_products");
            $this->db->join('tb_products_classification', 'tb_products_classification.idProductClassification = tb_products.idProductClassificationFk', 'inner');
            $quuery = $this->db->where("tb_products.idProduct = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();


                $this->db->select(" * ")->from("tb_products_divice_opening");
                $this->db->join('tb_products', 'tb_products.idProduct = tb_products_divice_opening.idProductFk', 'inner');
                $this->db->join('tb_divice_opening', 'tb_divice_opening.idDiviceOpening = tb_products_divice_opening.idDiviceOpeningFk', 'inner');
                $quuery = $this->db->where("tb_products_divice_opening.idProductFk = ", $id)->get();

                $rs2 =  $quuery->result_array();

                $rs['diviceOpening'] =  $rs2;

                return $rs;
            }
            return null;
        }else
        {

            $this->db->select(" * ")->from("tb_products");
            $this->db->join('tb_products_classification', 'tb_products_classification.idProductClassification = tb_products.idProductClassificationFk', 'inner');
            $this->db->where("tb_products.idStatusFk != ", -1);


                /* Busqueda por filtro */
    /*  if (!is_null($searchFilter['searchFilter']))
        {
            $this->db->like('tb_products.descriptionProduct', $searchFilter['searchFilter']);
        }


    $quuery = $this->db->order_by("tb_products.idProduct", "ASC")->get();


    if ($quuery->num_rows() > 0) {

        $rs =  $quuery->result_array();

        $list =  array();

        $i = 0;
        foreach ($quuery->result() as &$row){

            $this->db->select(" * ")->from("tb_products_divice_opening");
            $this->db->join('tb_products', 'tb_products.idProduct = tb_products_divice_opening.idProductFk', 'inner');
            $this->db->join('tb_divice_opening', 'tb_divice_opening.idDiviceOpening = tb_products_divice_opening.idDiviceOpeningFk', 'inner');
            $quuery = $this->db->where("tb_products_divice_opening.idProductFk = ", $row->idProduct)->get();

            $rs2 =  $quuery->result_array();
            $rs[$i]['diviceOpening'] =  $rs2;
            $i++;
        }


       return $rs;
    }
    return null;
    }
    }*/
    /*GET LIST OF TYPE OF SERVICES*/
    public
    function getTypeOfServices() {

        $query = null;
        $rs    = null;

        $query = $this->db->select(" * ")->from("tb_client_type_services")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    /*GET LIST OF ACCESS CONTROL DOORS */
    public
    function accessCtrlDoors() {

        $query = null;
        $rs    = null;

        $query = $this->db->select(" * ")->from("tb_access_control_door")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public
    function getPorIdContrato($idContrato) {

        $query         = null;
        $controlAcceso = null;
        $camaras       = null;
        $smartPanic    = null;
        $internet      = null;
        $toten         = null;
        $alarmas       = null;

        $query = $this->db->select(" * ")
            ->from("tb_client_services_access_control")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $controlAcceso = $query->result_array();
        }

        $query = $this->db->select(" * ")
            ->from("tb_client_services_internet")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $internet = $query->result_array();
        }

        $query = $this->db->select(" * ")
            ->from("tb_client_services_totem")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $toten = $query->result_array();
        }

        $query = $this->db->select(" * ")
            ->from("tb_client_services_smart_panic")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $smartPanic = $query->result_array();
        }

        $query = $this->db->select(" * ")
            ->from("tb_client_services_camera")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $camaras = $query->result_array();
        }

        $query = $this->db->select(" * ")
            ->from("tb_client_services_alarms")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();

        if ($query->num_rows() > 0) {
            $alarmas = $query->result_array();
        }

        $todo = [
            'controlAcceso' => $controlAcceso,
            'camaras'       => $camaras,
            'smartPanic'    => $smartPanic,
            'internet'      => $internet,
            'toten'         => $toten,
            'alarmas'       => $alarmas,
        ];

        return $todo;
    }

    public function getAditionalIdCliente($idServicesFk) {
        $query = null;
        $rs    = null;

        $query = $this->db->select(" * ")
            ->from("tb_detalles_control_acceso")
            ->where('idServicesFk', $idServicesFk)
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }


    public function addalarm($item) {
        $idClientServicesFk = $this->insertService($item, 'tb_client_services_alarms', 'idClientServicesAlarms'); //CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_alarms', [
                "name"                   => $item['name'],
                "idContracAssociated_SE" => $item['idContracAssociatedFk'],
                "idTypeMaintenanceFk"    => $item['idTypeMaintenanceFk'],
                "dateUp"                 => $item['dateUp'],
                "dateDown"               => $item['dateDown'],
                "companyMonitor"         => $item['companyMonitor'],
                "numberPay"              => $item['numberPay'],
                "alarmPanel"             => $item['alarmPanel'], //producto
                "alarmKeyboard"          => $item['alarmKeyboard'], //producto
                "panelAlarm"             => $item['panelAlarm'],
                "keyboardAlarm"          => $item['keyboardAlarm'],
                "countZoneIntaled"       => $item['countZoneIntaled'],
                "idTypeConectionRemote"  => $item['idTypeConectionRemote'], // 1, 2, 3
                "observation"            => $item['observation'],
                'idClientServicesFk'     => $idClientServicesFk,
            ]
        );


        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (count($item['adicional']) > 0) {
            $this->insertDatosAdicionalesAlarmas($item['adicional'], $id, $item['idClientFk']);
        }
        if (count($item['sensores_de_alarmas']) > 0) {
            $this->insertSensoresDeAlarmas($item['sensores_de_alarmas'], $id);
        }
        if (count($item['baterias_instaladas']) > 0) {
            $this->insertBateriasInstaladasAlarmas($item['baterias_instaladas'], $id);
        }
        if (count($item['tipo_conexion_remoto']) > 0) {
            $this->insertTipoConexionRemotoAlarmas($item['tipo_conexion_remoto'], $id);
        }


        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function editAlarm($item) {
        //$idClientServicesFk = $this->insertService($item, 'tb_client_services_alarms', 'idClientServicesAlarms'); //CREAMOS EL SERVICIO

        $this->db->set(
            [
                "name"                   => $item['name'],
                "idContracAssociated_SE" => $item['idContracAssociatedFk'],
                "idTypeMaintenanceFk"    => $item['idTypeMaintenanceFk'],
                "dateUp"                 => $item['dateUp'],
                "dateDown"               => $item['dateDown'],
                "companyMonitor"         => $item['companyMonitor'],
                "numberPay"              => $item['numberPay'],
                "alarmPanel"             => $item['alarmPanel'], //producto
                "alarmKeyboard"          => $item['alarmKeyboard'], //producto
                "panelAlarm"             => $item['panelAlarm'],
                "keyboardAlarm"          => $item['keyboardAlarm'],
                "countZoneIntaled"       => $item['countZoneIntaled'],
                "idTypeConectionRemote"  => $item['idTypeConectionRemote'], // 1, 2, 3
                "observation"            => $item['observation'],
            ]
        )->where("idClientServicesAlarms", $item['idClientServicesAlarms'])->update("tb_client_services_alarms");

        $data = $this->db->select("idClientServicesFk")
            ->from('tb_client_services_alarms')
            ->where("idClientServicesAlarms", $item['idClientServicesAlarms'])
            ->get();

        //return $data;

        $id = 0;
        if ($data->num_rows() > 0) {
            //return $data->result_array();
            $id = $data->result_array()[0]['idClientServicesFk'];
        }
        if ($id == 0) {
            return 0;
        }


        $id = $this->db->insert_id();
        $this->updatedService($idClientServicesFk, $id);

        if (count($item['adicional']) > 0) {
            $this->insertDatosAdicionalesAlarmas($item['adicional'], $item['idClientServicesAlarms'], $item['idClientFk'],true);
        }
        if (count($item['sensores_de_alarmas']) > 0) {
            $this->insertSensoresDeAlarmas($item['sensores_de_alarmas'], $item['idClientServicesAlarms'],true);
        }
        if (count($item['baterias_instaladas']) > 0) {
            $this->insertBateriasInstaladasAlarmas($item['baterias_instaladas'], $item['idClientServicesAlarms'],true);
        }
        if (count($item['tipo_conexion_remoto']) > 0) {
            $this->insertTipoConexionRemotoAlarmas($item['tipo_conexion_remoto'], $item['idClientServicesAlarms'],true);
        }


        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public
    function insertDatosAdicionalesAlarmas($data, $id) {
        foreach ($data as $item) {
            $this->db->insert('tb_datos_adicionales_alarmas', [
                    "fk_idTipoCliente"           => $item['fk_idTipoCliente'],
                    "fk_idEncargado"             => $item['fk_idEncargado'],
                    "telefono"                   => $item['telefono'],
                    "calles_laterales"           => $item['calles_laterales'],
                    "calle_trasera"              => $item['calle_trasera'],
                    "fk_idServiciosAdicionales"  => $item['fk_idServiciosAdicionales'],
                    "mail_reporte"               => $item['mail_reporte'],
                    "fk_idFormatoTransmision"    => $item['fk_idFormatoTransmision'],
                    "fk_idAutomarcado"           => $item['fk_idAutomarcado'],
                    "n_usuario_asalto"           => $item['n_usuario_asalto'],
                    "contraseña_asalto"          => $item['contraseña_asalto'],
                    "comisaria"                  => $item['comisaria'],
                    "tlf_comisaria"              => $item['tlf_comisaria'],
                    "servicio_emergencia_medica" => $item['servicio_emergencia_medica'],
                    "n_de_socio"                 => $item['n_de_socio'],
                    "plan"                       => $item['plan'],
                    "observacion_general"        => $item['observacion_general'],
                    "horario_automarcado"        => $item['horario_automarcado'],
                    "fkidClientServicesAlarms"   => $id,
                ]

            );
            $id = $this->db->insert_id();

            if (count($item['franjas_horarias']) > 0) {
                $this->insertFranjasHorariasAlarmas($item['franjas_horarias'], $id);
            }

            if (count($item['personas_para_dar_aviso']) > 0) {
                $this->insertPersonasParaDarAvisoAlarmas($item['personas_para_dar_aviso'], $id);
            }

            if (count($item['personas_para_verificar_en_el_lugar']) > 0) {
                $this->insertPersonasParaVerificarEnElLugarAlarmas($item['personas_para_verificar_en_el_lugar'], $id);
            }
        }

        return true;
    }

    public
    function insertFranjasHorariasAlarmas($data, $id) {
        foreach ($data as $item) {
            $this->db->insert('tb_franja_horaria_alarmas', [
                    // 'idClientFk'               => isset($item['idClientFk']) ? $item['idClientFk'] : null,
                    "dia"                      => $item['dia'],
                    "desde1"                   => $item['desde1'],
                    "hasta1"                   => $item['hasta1'],
                    "desde2"                   => $item['desde2'],
                    "hasta2"                   => $item['hasta2'],
                    "fk_idDatoAdicionalAlarma" => $id,
                ]
            );
        }

        return true;
    }

    public
    function insertSensoresDeAlarmas($data, $id) {
        foreach ($data as $item) {
            $this->db->insert('tb_sensors_alarm', [
                    "numberZoneSensor"         => $item["numberZoneSensor"],
                    "area"                     => $item["area"],
                    "nroZoneTamper"            => $item["nroZoneTamper"],
                    "locationLon"              => $item["locationLon"],
                    "idDvr"                    => $item["idDvr"],
                    "idCameraFk"               => $item["idCameraFk"],
                    "nroInterno"               => $item["nroInterno"],
                    "nroFrabric"               => $item["nroFrabric"],
                    //"idClientServicesAlarmsFk" => $id,
                    "fkidClientServicesAlarms" => $id,
                ]
            );
        }

        return true;
    }

    public
    function insertBateriasInstaladasAlarmas($data, $id) {
        foreach ($data as $item) {
            $this->db->insert('tb_alarm_batery', [
                    "nroInternal"              => $item['nroInternal'],
                    "nroFabric"                => $item['nroFabric'],
                    "dateExpired"              => $item['dateExpired'],
                    "isControlSchedule"        => $item['isControlSchedule'],
                    "fkidClientServicesAlarms" => $id,
                ]
            );
        }


        return true;
    }

    public
    function insertTipoConexionRemotoAlarmas($data, $id) {
        foreach ($data as $item) {
            if ($item['idTipoConexionRemoto'] >= 1 && $item['idTipoConexionRemoto'] <= 3) {
                $result = $this->db->select("*")
                    ->from('tb_tipo_conexion_remoto')
                    ->where('idTipoConexionRemoto', $item['idTipoConexionRemoto'])
                    ->get();

                if ($result->num_rows() > 0) {
                    $rs = $result->result_array();

                    if ($item['idTipoConexionRemoto'] == 1) {
                        $this->db->insert($rs[0]['tabla'], [
                                "company"                  => $item['data']['company'],
                                "line"                     => $item['data']['line'],
                                //"idClientServicesAlarmsFk" => $item['idClientServicesAlarmsFk'],
                                "fk_idDatoAdicionalAlarma" => $id,

                            ]
                        );
                    }

                    if ($item['idTipoConexionRemoto'] == 2) {
                        $this->db->insert($rs[0]['tabla'], [
                                "moduleIp"                 => $item['data']['moduleIp'],
                                "nroSerieFrabric"          => $item['data']['nroSerieFrabric'],
                                "nroSerieInternal"         => $item['data']['nroSerieInternal'],
                                "ip"                       => $item['data']['ip'],
                                "codeProgrm"               => $item['data']['codeProgrm'],
                                "portProgrm"               => $item['data']['portProgrm'],
                                "passwordAcces"            => $item['data']['passwordAcces'],
                                "codePart1"                => $item['data']['codePart1'],
                                "codePart2"                => $item['data']['codePart2'],
                                //"idClientServicesAlarmsFk" => $item['idClientServicesAlarmsFk'],
                                "fk_idDatoAdicionalAlarma" => $id,

                            ]
                        );
                    }

                    if ($item['idTipoConexionRemoto'] == 3) {
                        $this->db->insert($rs[0]['tabla'], [
                                //"idClientServicesAlarmsFk" => $item['idClientServicesAlarmsFk'],
                                "moduleGprs"               => $item['data']['moduleGprs'],
                                "nroSerieFrabric"          => $item['data']['nroSerieFrabric'],
                                "nroSerieInternal"         => $item['data']['nroSerieInternal'],
                                "codeProgram"              => $item['data']['codeProgram'],
                                "portProgram"              => $item['data']['portProgram'],
                                "passwordAcces"            => $item['data']['passwordAcces'],
                                "codePart1"                => $item['data']['codePart1'],
                                "codePart2"                => $item['data']['codePart2'],
                                "fk_idDatoAdicionalAlarma" => $id,

                            ]
                        );
                    }
                }
            }


        }

        return true;
    }

    public
    function insertPersonasParaDarAvisoAlarmas($data, $id) {
        foreach ($data as $item) {
            $this->db->insert('tb_personas_para_dar_aviso_alarmas', [
                    "fk_idUserSystema"         => @$item["fk_idUserSystema"],
                    "nombre_apellido"          => @$item["nombre_apellido"],
                    "vinculo"                  => $item["vinculo"],
                    "palabra_clave"            => $item["palabra_clave"],
                    "telefono"                 => $item["telefono"],
                    "numero_del_usuario"       => $item["numero_del_usuario"],
                    "fk_idDatoAdicionalAlarma" => $id,
                ]
            );
        }

        return true;
    }

    public
    function insertPersonasParaVerificarEnElLugarAlarmas($data, $id) {
        foreach ($data as $item) {
            $this->db->insert('tb_personas_para_verificar_en_lugar', [
                    "fk_idUserSystema"         => @$item["fk_idUserSystema"],
                    "nombre_apellido"          => @$item["nombre_apellido"],
                    "vinculo"                  => $item["vinculo"],
                    "telefono"                 => $item["telefono"],
                    "numero_del_usuario"       => $item["numero_del_usuario"],
                    "fk_idDatoAdicionalAlarma" => $id,
                ]
            );
        }

        return true;
    }
}

?>