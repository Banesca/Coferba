<?php if (! defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Services_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function addinternet($item)
    {

        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_internet', [
                'idClientServicesFk'  => $idClientServicesFk,
                'idTypeInternetFk'    => $item['idTypeInternetFk'],
                'idTypeMaintenanceFk' => $item['idTypeMaintenanceFk'],
                'idServiceFk'         => $item['idServiceFk'],
                'idServiceAsociateFk' => $item['idServiceAsociateFk'],
                'idRouterInternetFk'  => $item['idRouterInternetFk'],
                'numberSeria'         => $item['numberSeria'],
                'userAdmin'           => $item['userAdmin'],
                'contract'            => $item['contract'],
                'idInternetCompanyFk' => $item['idInternetCompanyFk'],
                'modenMark'           => $item['modenMark'],
                'dateDown'            => $item['dateDown'],
                'isDown'              => $item['isDown'],
                'port'                => $item['port'],
                'passAdmin'           => $item['passAdmin'],
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addgps($item)
    {
        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_gps', [
                'idClientServicesFk'     => $idClientServicesFk,
                'idTypeGpsFk'            => $item['idTypeGpsFk'],
                'idTypeMaintenanceFk'    => $item['idTypeMaintenanceFk'],
                'dateUp'                 => $item['dateUp'],
                'dateDown'               => $item['dateDown'],
                'moden'                  => $item['moden'],
                'contract'               => $item['contract'],
                'idInternetCompanyFk'    => $item['idInternetCompanyFk'],
                'nroLine'                => $item['nroLine'],
                'nroChip'                => $item['nroChip'],
                'idServiceAsociateFk'    => $item['idServiceAsociateFk'],
                'nroSerieInternal'       => $item['nroSerieInternal'],
                'nroSerieManufacturer'   => $item['nroSerieManufacturer'],
                'idContracAssociated_SE' => $item['idContracAssociated_SE'],
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addaccescontrol($item)
    {

        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_acces_control', [
                'idClientServicesFk'  => $idClientServicesFk,
                'door'                => $item['door'],
                'contract'            => $item['contract'],
                'dateUp'              => $item['dateUp'],
                'dateDown'            => $item['dateDown'],
                'accesControl'        => $item['accesControl'],
                'readerEntry'         => $item['readerEntry'],
                'locationGabinet'     => $item['locationGabinet'],
                'font'                => $item['font'],
                'aclaration'          => $item['aclaration'],
                'idTypeMaintenanceFk' => $item['idTypeMaintenanceFk'],
                'lock'                => $item['lock'],
                'ouputReader'         => $item['ouputReader'],
                'ouputButom'          => $item['ouputButom'],
                'isOuputReader'       => $item['isOuputReader'],
                'isOuputButom'        => $item['isOuputButom'],
                'isBlocklingScrew'    => $item['isBlocklingScrew'],
                'butonEmergency'      => $item['butonEmergency'],
                'keyboardOff'         => $item['keyboardOff'],
                'acaration2'          => $item['acaration2'],
                'address'             => $item['address'],
                'addressLat'          => $item['addressLat'],
                'addressLon'          => $item['addressLon'],
                'portNumberRouter'    => $item['portNumberRouter'],
                'addressClient'       => $item['addressClient'],
                'addressVpn'          => $item['addressVpn'],
                'addressClientLat'    => $item['addressClientLat'],
                'addressClientLon'    => $item['addressClientLon'],
                'user'                => $item['user'],
                'useVpn'              => $item['useVpn'],
                'passVpn'             => $item['passVpn'],
                'pass'                => $item['pass'],
                'portHttp'            => $item['portHttp'],
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addsmartpanic($item)
    {

        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_smart_panic', [
                'idClientServicesFk'         => $idClientServicesFk,
                'idClientServicesSmartPanic' => $item['idClientServicesSmartPanic'],
                'name'                       => $item['name'],
                'contract'                   => $item['contract'],
                'dateUp'                     => $item['dateUp'],
                'dateDown'                   => $item['dateDown'],
                'idTypeMaintenanceFk'        => $item['idTypeMaintenanceFk'],
                'companyMonitor'             => $item['companyMonitor'],
                'sucribeNumber'              => $item['sucribeNumber'],
                'idDetinationOfLicenseFk'    => $item['idDetinationOfLicenseFk'],
                'idDepartmentFk'             => $item['idDepartmentFk'],
                'countNewLicense'            => $item['countNewLicense'],
                'observation'                => $item['observation'],
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addcamera($item)
    {

        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_camera', [
                'name'                => $item['name'],
                'contract'            => $item['contract'],
                'idTypeMaintenanceFk' => $item['idTypeMaintenanceFk'],
                'dateUp'              => $item['dateUp'],
                'dateDown'            => $item['dateDown'],
                'DVR'                 => $item['DVR'],
                'location'            => $item['location'],
                'locationLat'         => $item['locationLat'],
                'locationLon'         => $item['locationLon'],
                'maxCamera'           => $item['maxCamera'],
                'numberPortRouter'    => $item['numberPortRouter'],
                'addressVpn'          => $item['addressVpn'],
                'nroPort1'            => $item['nroPort1'],
                'nroPort2'            => $item['nroPort2'],
                'namePort1'           => $item['namePort1'],
                'namePort2'           => $item['namePort2'],
                'observation'         => $item['observation'],
                'addessClient'        => $item['addessClient'],
                'addessClientLat'     => $item['addessClientLat'],
                'addessClientLot'     => $item['addessClientLot'],
                'portHttp'            => $item['portHttp'],
                'namePort'            => $item['namePort'],
                'port'                => $item['port'],
                'idClientServicesFk'  => $idClientServicesFk,
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addTotem($item)
    {

        $idClientServicesFk = $this->insertService($item);// CREAMOS EL SERVICIO

        $this->db->insert('tb_client_services_totem', [
                'name'               => $item['name'],
                'contract_SE'        => $item['contract_SE'],
                'item_SE'            => $item['item_SE'],
                'date'               => $item['date'],
                'idCompanyFk'        => $item['idCompanyFk'],
                'dvr_nvr'            => $item['dvr_nvr'],
                'addresss'           => $item['addresss'],
                'latAddress'         => $item['latAddress'],
                'lonAddress'         => $item['lonAddress'],
                'maxCamera'          => $item['maxCamera'],
                'idTotenModelFk'     => $item['idTotenModelFk'],
                'tipeMaintenance_SE' => $item['tipeMaintenance_SE'],
                'dateDown'           => $item['dateDown'],
                'numerFertilizer'    => $item['numerFertilizer'],
                'numberPort'         => $item['numberPort'],
                'addreesVpn'         => $item['addreesVpn'],
                'namePort1'          => $item['namePort1'],
                'numberPort1'        => $item['numberPort1'],
                'namePort2'          => $item['namePort2'],
                'numberPort2'        => $item['numberPort2'],
                'addressClientInter' => $item['addressClientInter'],
                'portHttpInter'      => $item['portHttpInter'],
                'namePortInter'      => $item['namePortInter'],
                'numberPortInter'    => $item['numberPortInter'],
                'observatioGeneral'  => $item['observatioGeneral'],
                'idClientServicesFk' => $idClientServicesFk,
            ]
        );

        if ($this->db->affected_rows() === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    public function insertService($product)
    {
        $this->db->insert('tb_client_services', [
                'idClientFk'      => $product['idClientFk'],
                'idTipeServiceFk' => $product['idTipeServiceFk'],
            ]
        );

        return $this->db->insert_id();
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
}

?>

	 