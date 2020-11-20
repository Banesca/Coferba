<?php if (! defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Services_model extends CI_Model {
    public function __construct() {
        parent::__construct();
    }

    public function addinternet($item) {

        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_internet', [
                'idClientServicesFk'     => $idClientServicesFk,
                'idTypeInternetFk'       => $item['idTypeInternetFk'],
                'typeMaintenance'        => $item['typeMaintenance'],
                'idServiceFk'            => $item['idServiceFk'],
                'idServiceAsociateFk'    => $item['idServiceAsociateFk'],
                'idRouterInternetFk'     => $item['idRouterInternetFk'],
                'numberSeria'            => $item['numberSeria'],
                'userAdmin'              => $item['userAdmin'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'idInternetCompanyFk'    => $item['idInternetCompanyFk'],
                'modenMark'              => $item['modenMark'],
                'dateDown'               => $item['dateDown'],
                'dateUp'                 => $item['dateUp'],
                'isDown'                 => $item['isDown'],
                'port'                   => $item['port'],
                'passAdmin'              => $item['passAdmin'],
                'nroSerieInternal'       => $item['nroSerieInternal'],
                'nroSerieManufacturer'   => $item['nroSerieManufacturer'],
            ]
        );

        $id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
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

    public function addgps($item) {
        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

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
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
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

        //$idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_access_control', [
                //'idClientServicesFk'            => $idClientServicesFk,
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
                //'address'                => $item['address'],
                //'addressLat'             => $item['addressLat'],
                //'addressLon'             => $item['addressLon'],
                'portNumberRouter'        => $item['portNumberRouter'],
                'addressClient'           => $item['addressClient'],
                'addressVpn'              => $item['addressVpn'],
                //'addressClientLat'       => $item['addressClientLat'],
                //'addressClientLon'       => $item['addressClientLon'],
                'user'                    => $item['user'],
                'useVpn'                  => $item['useVpn'],
                'passVpn'                 => $item['passVpn'],
                'pass'                    => $item['pass'],
                'portHttp'                => $item['portHttp'],

                'emergencyButton'         => $item['emergencyButton'],
                'offKey'                  => $item['offKey'],
                'locationEmergencyButton' => $item['locationEmergencyButton'],
                'locationOffKey'          => $item['locationOffKey'],

            ]
        );


        $id = $this->db->insert_id();

        if (count($item['battery_install']) > 0) {
            $this->insertServiceBatteryAccessControl($item['battery_install'], $id);  //se crean las baterias
        }
        $id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
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

    public function addsmartpanic($item) {

        $idClientServicesFk = $this->insertService($item); // CREAMOS EL SERVICIO

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
                'countNewLicense'         => $item['countNewLicense'],
                'observation'             => $item['observation'],
            ]
        );
        $id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
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
        $idClientServicesFk = $this->insertService($item['services']); // CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_camera', [
                'name'                     => $item['services']['name'],
                'idContracAssociated_SE'   => $item['services']['idContracAssociated_SE'],
                'idTypeMaintenanceFk'      => $item['services']['idTypeMaintenanceFk'],
                'dateUp'                   => $item['services']['dateUp'],
                'dateDown'                 => $item['services']['dateDown'],
                'idDvrNvr_tb_prod_classFk' => $item['services']['idDvrNvr_tb_prod_classFk'],
                'location'                 => $item['services']['location'],
                'locationLat'              => $item['services']['locationLat'],
                'locationLon'              => $item['services']['locationLon'],
                'maxCamera'                => $item['services']['maxCamera'],
                'numberPortRouter'         => $item['services']['numberPortRouter'],
                'addressVpn'               => $item['services']['addressVpn'],
                'nroPort1'                 => $item['services']['nroPort1'],
                'nroPort2'                 => $item['services']['nroPort2'],
                'namePort1'                => $item['services']['namePort1'],
                'namePort2'                => $item['services']['namePort2'],
                'observation'              => $item['services']['observation'],
                'addessClient'             => $item['services']['addessClient'],
                'addessClientLat'          => $item['services']['addessClientLat'],
                'addessClientLot'          => $item['services']['addessClientLot'],
                'portHttp'                 => $item['services']['portHttp'],
                'namePort'                 => $item['services']['namePort'],
                'port'                     => $item['services']['port'],
                'idClientServicesFk'       => $idClientServicesFk,
            ]
        );

        $id = $this->db->insert_id();

        if (count($item['clients']) > 0) {
            $this->insertServiceUser($item['clients'], $id);  //se crean los usuarios dvr
        }
        if (count($item['cameras']) > 0) {
            $this->insertServiceCamera($item['cameras'], $id);// CREAMOS las camaras
        }
        if (count($item['backup_energy']) > 0) {
            $this->insertServiceEnergy($item['backup_energy'], $id);// CREAMOS las opciones de energia
        }
        $id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
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

        $idClientServicesFk = $this->insertServiceUser($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_totem', [
                'name'                   => $item['name'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
                'item_SE'                => $item['item_SE'],
                'date'                   => $item['date'],
                'idCompanyFk'            => $item['idCompanyFk'],
                'dvr_nvr'                => $item['dvr_nvr'],
                'addresss'               => $item['addresss'],
                'latAddress'             => $item['latAddress'],
                'lonAddress'             => $item['lonAddress'],
                'maxCamera'              => $item['maxCamera'],
                'idTotenModelFk'         => $item['idTotenModelFk'],
                'tipeMaintenance_SE'     => $item['tipeMaintenance_SE'],
                'dateDown'               => $item['dateDown'],
                'numerFertilizer'        => $item['numerFertilizer'],
                'numberPort'             => $item['numberPort'],
                'addreesVpn'             => $item['addreesVpn'],
                'namePort1'              => $item['namePort1'],
                'numberPort1'            => $item['numberPort1'],
                'namePort2'              => $item['namePort2'],
                'numberPort2'            => $item['numberPort2'],
                'addressClientInter'     => $item['addressClientInter'],
                'portHttpInter'          => $item['portHttpInter'],
                'namePortInter'          => $item['namePortInter'],
                'numberPortInter'        => $item['numberPortInter'],
                'observatioGeneral'      => $item['observatioGeneral'],
                'idClientServicesFk'     => $idClientServicesFk,
            ]
        );

        $id = $this->db->insert_id();
        if (isset($item['adicional'])) {
            foreach ($item['adicional'] as $item1) {
                $this->db->insert('tb_detalles_control_acceso', [
                        "numberSerieFabric"   => $item1['numberSerieFabric'],
                        "numberSerieInternal" => $item1['numberSerieInternal'],
                        "dateExpiration"      => $item1['dateExpiration'],
                        "idProductoFk"        => $item1['idProductoFk'],
                        "idServicesFk"        => $id,
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

    public function insertServiceUser($product, $id) {
        foreach ($product as $item) {
            $this->db->insert('tb_client_camera', [
                    'idClientFk'               => $item['idClientFk'],
                    "idClientServicesCameraFk" => $id,
                    'name'                     => $item['name'],
                    'user'                     => $item['user'],
                    'pass'                     => $item['pass'],
                ]
            );
        }

        return true;
    }

    public function insertServiceBatteryAccessControl($product, $id) {
        foreach ($product as $item) {
            $this->db->insert('tb_battery_install_access_control', [
                    "idClientServicesAccessControlFk" => $id,
                    "idBatteryFk"                     => $item["idBatteryFk"],
                ]
            );
        }

        return true;
    }

    public function insertService($product) {
        $this->db->insert('tb_client_services', [
                'idClientFk'      => $product['idClientFk'],
                'idTipeServiceFk' => $product['idTipeServiceFk'],
            ]
        );

        return $this->db->insert_id();
    }

    public function insertServiceCamera($product, $id) {
        foreach ($product as $item) {
            $this->db->insert('tb_cameras', [
                    "idClientServicesCameraFk" => $id,
                    "portCamera"               => $item['portCamera'],
                    "coveredArea"              => $item['coveredArea'],
                    "locationCamera"           => $item['locationCamera'],
                    "nroSerieCamera"           => $item['nroSerieCamera'],
                    "nroFabricCamera"          => $item['nroFabricCamera'],
                    "dateExpireCamera"         => $item['dateExpireCamera'],
                ]
            );
        }

        return true;
    }

    public function insertServiceEnergy($product, $id) {
        foreach ($product as $item) {
            $this->db->insert('tb_backup_energy', [
                    "idClientServicesCameraFk" => $id,
                    "description"              => $item['description'],
                    "idBatteryFk"              => $item['idBatteryFk'],
                ]
            );
        }

        return true;
    }

    public function insertLicence($item) {
        $this->db->insert('tb_user_license', [
                "fullName"               => $item['fullName'],
                "email"                  => $item['email'],
                "phone"                  => $item['phone'],
                "key"                    => $item['key'],
                "isAndroidOperantSystem" => $item['isAndroidOperantSystem'],
                "profileUser"            => $item['profileUser'],
            ]
        );

        $id  = $this->db->insert_id();
        $res = null;

        if ($this->db->affected_rows() === 1) {
            $res = 1;
        } else {
            $res = 0;
        }

        return json_encode([ 'id' => $id, 'res' => $res ]);
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

            $this->db->select("*")->from("tb_products");
            $this->db->join('tb_products_classification', 'tb_products_classification.idProductClassification = tb_products.idProductClassificationFk', 'inner');
            $quuery = $this->db->where("tb_products.idProduct =", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();


                $this->db->select("*")->from("tb_products_divice_opening");
                $this->db->join('tb_products', 'tb_products.idProduct = tb_products_divice_opening.idProductFk', 'inner');
                $this->db->join('tb_divice_opening', 'tb_divice_opening.idDiviceOpening = tb_products_divice_opening.idDiviceOpeningFk', 'inner');
                $quuery = $this->db->where("tb_products_divice_opening.idProductFk =", $id)->get();

                $rs2 =  $quuery->result_array();

                $rs['diviceOpening'] =  $rs2;

                return $rs;
            }
            return null;
        }else
        {

            $this->db->select("*")->from("tb_products");
            $this->db->join('tb_products_classification', 'tb_products_classification.idProductClassification = tb_products.idProductClassificationFk', 'inner');
            $this->db->where("tb_products.idStatusFk !=", -1);


                /* Busqueda por filtro */
    /*	if (!is_null($searchFilter['searchFilter']))
        {
            $this->db->like('tb_products.descriptionProduct', $searchFilter['searchFilter']);
        }


   $quuery = $this->db->order_by("tb_products.idProduct", "ASC")->get();


   if ($quuery->num_rows() > 0) {

        $rs =  $quuery->result_array();

        $list =  array();

        $i = 0;
        foreach ($quuery->result() as &$row){

            $this->db->select("*")->from("tb_products_divice_opening");
            $this->db->join('tb_products', 'tb_products.idProduct = tb_products_divice_opening.idProductFk', 'inner');
            $this->db->join('tb_divice_opening', 'tb_divice_opening.idDiviceOpening = tb_products_divice_opening.idDiviceOpeningFk', 'inner');
            $quuery = $this->db->where("tb_products_divice_opening.idProductFk =", $row->idProduct)->get();

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
    public function getTypeOfServices() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_client_type_services")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    /*GET LIST OF ACCESS CONTROL DOORS */
    public function accessCtrlDoors() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_access_control_door")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getPorIdContrato($idContrato) {

        $query         = null;
        $controlAcceso = null;
        $camaras       = null;
        $smartPanic    = null;
        $internet      = null;
        $toten         = null;
        $alarmas       = null;

        $query = $this->db->select("*")
            ->from("tb_client_services_access_control")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $controlAcceso = $query->result_array();
        }

        $query = $this->db->select("*")
            ->from("tb_client_services_internet")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $internet = $query->result_array();
        }

        $query = $this->db->select("*")
            ->from("tb_client_services_totem")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $toten = $query->result_array();
        }

        $query = $this->db->select("*")
            ->from("tb_client_services_smart_panic")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $smartPanic = $query->result_array();
        }

        $query = $this->db->select("*")
            ->from("tb_client_services_camera")
            ->where('idContracAssociated_SE', $idContrato)
            ->get();
        if ($query->num_rows() > 0) {
            $camaras = $query->result_array();
        }

        $query = $this->db->select("*")
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
}

?> 