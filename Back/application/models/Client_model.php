<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Client_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }


    // ADMINISTRADORES //
    public function addAdmin($client) {
        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }
        $user = null;
        $this->db->select("*")->from("tb_clients");
        $this->db->where("tb_clients.name =", $client['name']);
        $query = $this->db->where("tb_clients.idClientTypeFk =", $client['idClientTypeFk'])->get();
        if ($query->num_rows() < 1) {

            $this->db->insert('tb_clients', [
                    'idClientTypeFk'          => $client['idClientTypeFk'],
                    'name'                    => $client['name'],
                    'address'                 => $client['address'],
                    'addressLat'              => $client['addressLat'],
                    'addressLon'              => $client['addressLon'],
                    'idAgentFk'               => $client['idAgentFk'],
                    'businessName'            => $client['businessName'],
                    'CUIT'                    => $client['CUIT'],
                    'idLocationFk'            => $client['idLocationFk'],
                    'idProvinceFk'            => $client['idProvinceFk'],
                    'observation'             => $client['observation'],
                    'pageWeb'                 => $client['pageWeb'],
                    'idStatusFk'              => 1,
                    'mailFronKey'             => $client['mailFronKey'],
                    'observationOrderKey'     => $client['observationOrderKey'],
                    'isNotCliente'            => $client['isNotCliente'],
                    'idClientAdminFk'         => $client['idClientAdminFk'],
                    'mailServiceTecnic'       => $client['mailServiceTecnic'],
                    'observationSericeTecnic' => $client['observationSericeTecnic'],
                    'mailCollection'          => $client['mailCollection'],
                    'observationCollection'   => $client['observationCollection'],
                    'idClientCompaniFk'       => $client['idClientCompaniFk'],
                    'idZonaFk'                => @$client['idZonaFk'],
                    'idTipoInmuebleFk'        => @$client['idTipoInmuebleFk'],
                    'idClientDepartamentFk'   => @$idClientDepartamentFk,

                ]
            );

            if ($this->db->affected_rows() === 1) {
                $idClientFk = $this->db->insert_id();

                // DATOS DE FACTURCION
                $this->db->insert('tb_client_billing_information', [
                        'idClientFk'          => $idClientFk,
                        'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                        'cuitBilling'         => $client['billing_information']['cuitBilling'],
                        'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                        'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                        'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'],
                    ]
                );

                if (count(@$client['list_schedule_atention']) > 0
                    && count(@$client['list_phone_contact']) > 0
                    || count(@$client['list_client_user']) > 0
                ) {

                    // HORARIOS
                    foreach ($client['list_schedule_atention'] as $valor) {

                        $this->db->insert('tb_client_schedule_atention', [
                                'idClienteFk' => $idClientFk,
                                'day'         => $valor['day'],
                                'fronAm'      => $valor['fronAm'],
                                'toAm'        => $valor['toAm'],
                                'fronPm'      => $valor['fronPm'],
                                'toPm'        => $valor['toPm'],
                            ]
                        );
                    }
                    //  TELEFONOS DE CONTACTO
                    foreach (@$client['list_phone_contact'] as $valor) {

                        $this->db->insert('tb_client_phone_contact', [
                                'idClientFk'   => $idClientFk,
                                'phoneTag'     => $valor['phoneTag'],
                                'phoneContact' => $valor['phoneContact'],
                            ]
                        );
                    }

                    //  USUARIOS DE LA EMPRESA
                    foreach ($client['list_client_user'] as $valor) {

                        $this->db->insert('tb_client_users', [
                                'idClientFk' => $idClientFk,
                                'idUserFk'   => $valor['idUserFk'],
                            ]
                        );
                    }

                }

                return 1;
            } else {
                return 0;
            }
        } else {
            return 2;
        }


    }

    public function searchAddress($address) {
        $user = null;
        $this->db->select("*")->from("tb_clients");
        $this->db->where("tb_clients.address =", $address);
        $query = $this->db->where("tb_clients.idClientTypeFk =", 2)->get();

        if ($query->num_rows() > 0) {
            $rs = $query->result_array();

            return $rs;
        } else {
            return 0;
        }


    }

    public function updateAdmin($client) {

        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }


        $this->db->set(
            [
                'idClientTypeFk'          => $client['idClientTypeFk'],
                'name'                    => $client['name'],
                'address'                 => $client['address'],
                'addressLat'              => $client['addressLat'],
                'addressLon'              => $client['addressLon'],
                'idAgentFk'               => $client['idAgentFk'],
                'businessName'            => $client['businessName'],
                'CUIT'                    => $client['CUIT'],
                'idLocationFk'            => $client['idLocationFk'],
                'idProvinceFk'            => $client['idProvinceFk'],
                'observation'             => $client['observation'],
                'pageWeb'                 => $client['pageWeb'],
                'idStatusFk'              => 1,
                'mailFronKey'             => $client['mailFronKey'],
                'observationOrderKey'     => $client['observationOrderKey'],
                'isNotCliente'            => $client['isNotCliente'],
                'idClientAdminFk'         => $client['idClientAdminFk'],
                'mailServiceTecnic'       => $client['mailServiceTecnic'],
                'observationSericeTecnic' => $client['observationSericeTecnic'],
                'mailCollection'          => $client['mailCollection'],
                'observationCollection'   => $client['observationCollection'],
                'idClientCompaniFk'       => $client['idClientCompaniFk'],
                'idZonaFk'                => @$client['idZonaFk'],
                'idClientDepartamentFk'   => @$idClientDepartamentFk,
            ]
        )->where("idClient", $client['idClient'])->update("tb_clients");


        $this->db->set(
            [
                'idClientFk'          => $client['idClient'],
                'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                'cuitBilling'         => $client['billing_information']['cuitBilling'],
                'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'] ]
        )->where("idClientFk", $client['idClient'])->update("tb_client_billing_information");


        if (count(@$client['list_schedule_atention']) > 0
            && count(@$client['list_phone_contact']) > 0
            || count(@$client['list_client_user']) > 0
        ) {
            $this->db->delete('tb_client_schedule_atention', [ 'idClienteFk' => $client['idClient'] ]);

            foreach ($client['list_schedule_atention'] as $valor) {

                $this->db->insert('tb_client_schedule_atention', [
                    'idClienteFk' => $valor['idClienteFk'],
                    'day'         => $valor['day'],
                    'fronAm'      => $valor['fronAm'],
                    'toAm'        => $valor['toAm'],
                    'fronPm'      => $valor['fronPm'],
                    'toPm'        => $valor['toPm'],
                ]);
            }

            $this->db->delete('tb_client_phone_contact', [ 'idClientFk' => $client['idClient'] ]);

            foreach ($client['list_phone_contact'] as $valor) {

                $this->db->insert('tb_client_phone_contact', [
                    'idClientFk'   => $valor['idClientFk'],
                    'phoneTag'     => $valor['phoneTag'],
                    'phoneContact' => $valor['phoneContact'],
                ]);
            }

            $this->db->delete('tb_client_users', [ 'idClientFk' => $client['idClient'] ]);


            foreach ($client['list_client_user'] as $valor) {

                $this->db->insert('tb_client_users', [
                        'idClientFk' => $valor['idClienteFk'],
                        'idUserFk'   => $valor['idUserFk'],
                    ]
                );
            }


            return true;
        }

    }

    // ****************  //

    public function delete($idClient) {

        $this->db->set(
            [ 'idStatusFk' => -1 ])->where("idClient", $idClient)->update("tb_clients");

        return true;


    }

    public function getadmin($id = null, $searchFilter = null, $idClientTypeFk = null) {
        $quuery = null;
        $rs     = null;

        if (! is_null($id)) {


            $this->db->select("*")->from("tb_clients");
            $this->db->join('tb_client_type', 'tb_client_type.idClientType = tb_clients.idClientTypeFk', 'left');
            $quuery = $this->db->where("tb_clients.idClient =", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs = $quuery->row_array();


                $this->db->select("*")->from("tb_client_schedule_atention");
                $quuery = $this->db->where("tb_client_schedule_atention.idClienteFk =", $id)->get();

                $rs1                          = $quuery->result_array();
                $rs['list_schedule_atention'] = $rs1;


                $this->db->select("*")->from("tb_client_phone_contact");
                $quuery = $this->db->where("tb_client_phone_contact.idClientFk =", $id)->get();

                $rs2                      = $quuery->result_array();
                $rs['list_phone_contact'] = $rs2;


                $this->db->select("*")->from("tb_client_users");
                $this->db->join('tb_user', 'tb_user.idUser = tb_client_users.idUserFk', 'inner');
                $quuery = $this->db->where("tb_client_users.idClientFk =", $id)->get();

                $rs3                    = $quuery->result_array();
                $rs['list_client_user'] = $rs3;


                // DATOS DE FACTURCION
                $this->db->select("*")->from("tb_client_billing_information");
                $this->db->join('tb_tax', 'tb_tax.idTypeTax = tb_client_billing_information.idTypeTaxFk', 'inner');
                $this->db->join('tb_location', 'tb_location.idLocation = tb_client_billing_information.idLocationBillingFk', 'inner');
                $this->db->join('tb_province', 'tb_province.idProvince = tb_client_billing_information.idProvinceBillingFk', 'inner');
                $quuery = $this->db->where("tb_client_billing_information.idClientFk =", $id)->get();

                $rs4                       = $quuery->result_array();
                $rs['billing_information'] = $rs4;


                return $rs;
            }

            return null;
        } else {

            $this->db->select("*")->from("tb_clients");
            $this->db->join('tb_client_type', 'tb_client_type.idClientType = tb_clients.idClientTypeFk', 'left');
            $this->db->where("tb_clients.idStatusFk !=", -1);


            /* Busqueda por filtro */

            if (! is_null($idClientTypeFk['idClientTypeFk'])) {
                $this->db->where('tb_clients.idClientTypeFk', $idClientTypeFk['idClientTypeFk']);
            }

            if (! is_null($searchFilter['searchFilter'])) {
                $this->db->like('tb_clients.name', $searchFilter['searchFilter']);
            }


            $quuery = $this->db->order_by("tb_clients.idClient", "ASC")->get();


            if ($quuery->num_rows() > 0) {

                $rs = $quuery->result_array();


                $i = 0;
                foreach ($quuery->result() as &$row) {


                    $this->db->select("*")->from("tb_client_schedule_atention");
                    $quuery = $this->db->where("tb_client_schedule_atention.idClienteFk =", $row->idClient)->get();

                    $rs1                              = $quuery->result_array();
                    $rs[$i]['list_schedule_atention'] = $rs1;


                    $this->db->select("*")->from("tb_client_phone_contact");
                    $quuery = $this->db->where("tb_client_phone_contact.idClientFk =", $row->idClient)->get();

                    $rs2                          = $quuery->result_array();
                    $rs[$i]['list_phone_contact'] = $rs2;


                    $this->db->select("*")->from("tb_client_users");
                    $this->db->join('tb_user', 'tb_user.idUser = tb_client_users.idUserFk', 'inner');
                    $quuery = $this->db->where("tb_client_users.idClientFk =", $row->idClient)->get();

                    $rs3                        = $quuery->result_array();
                    $rs[$i]['list_client_user'] = $rs3;


                    // DATOS DE FACTURCION
                    $this->db->select("*")->from("tb_client_billing_information");
                    $this->db->join('tb_tax', 'tb_tax.idTypeTax = tb_client_billing_information.idTypeTaxFk', 'inner');
                    $this->db->join('tb_location', 'tb_location.idLocation = tb_client_billing_information.idLocationBillingFk', 'inner');
                    $this->db->join('tb_province', 'tb_province.idProvince = tb_client_billing_information.idProvinceBillingFk', 'inner');
                    $quuery = $this->db->where("tb_client_billing_information.idClientFk =", $row->idClient)->get();

                    $rs4                           = $quuery->result_array();
                    $rs[$i]['billing_information'] = $rs4;


                    $i++;
                }

                return $rs;

                return null;
            }

            return null;
        }


    }

    public function getModules() {
        $query = $this->db->select("*")->from("tb_modules")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();

            return $rs;
        }

        return null;

    }

    //  EDIFICIO //
    public function addBuilding($client) {

        $user = null;

        $this->db->select("*")->from("tb_clients");
        $this->db->where("tb_clients.name =", $client['name']);
        $query = $this->db->where("tb_clients.idClientTypeFk =", $client['idClientTypeFk'])->get();

        if ($query->num_rows() < 1) {


            $this->db->insert('tb_clients', [
                    'idClientTypeFk'          => $client['idClientTypeFk'],
                    'name'                    => $client['name'],
                    'address'                 => $client['address'],
                    'addressLat'              => $client['addressLat'],
                    'addressLon'              => $client['addressLon'],
                    'idAgentFk'               => $client['idAgentFk'],
                    'isNotCliente'            => $client['isNotCliente'],
                    'idClientAdminFk'         => $client['idClientAdminFk'],
                    'mailFronKey'             => $client['mailFronKey'],
                    'observationOrderKey'     => $client['observationOrderKey'],
                    'mailServiceTecnic'       => $client['mailServiceTecnic'],
                    'observationSericeTecnic' => $client['observationSericeTecnic'],
                    'mailCollection'          => $client['mailCollection'],
                    'observationCollection'   => $client['observationCollection'],
                    'observation'             => $client['observation'],
                    'idStatusFk'              => 1,
                    'idZonaFk'                => @$client['idZonaFk'],
                ]
            );

            if ($this->db->affected_rows() === 1) {
                $idClientFk = $this->db->insert_id();

                // DATOS DE FACTURCION
                $this->db->insert('tb_client_billing_information', [
                        'idClientFk'          => $idClientFk,
                        'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                        'cuitBilling'         => $client['billing_information']['cuitBilling'],
                        'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                        'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                        'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'],
                    ]
                );

                if (count(@$client['list_schedule_atention']) > 0
                    && count(@$client['list_departament']) > 0
                    && count(@$client['list_phone_contact']) > 0
                    || count(@$client['tb_client_ufc']) > 0
                ) {

                    // HORARIOS
                    foreach ($client['list_schedule_atention'] as $valor) {

                        $this->db->insert('tb_client_schedule_atention', [
                                'idClienteFk' => $idClientFk,
                                'day'         => $valor['day'],
                                'fronAm'      => $valor['fronAm'],
                                'toAm'        => $valor['toAm'],
                                'fronPm'      => $valor['fronPm'],
                                'toPm'        => $valor['toPm'],
                            ]
                        );
                    }


                    //  DEPARTAMENTO
                    foreach ($client['list_departament'] as $valor) {

                        $this->db->insert('tb_client_departament', [
                                'idClientFk'              => $idClientFk,
                                'floor'                   => $valor['floor'],
                                'departament'             => $valor['departament'],
                                'idCategoryDepartamentFk' => $valor['idCategoryDepartamentFk'],
                                'idStatusFk'              => 1,
                                'numberUNF'               => $valor['numberUNF'],
                            ]
                        );
                    }

                    //  TELEFONOS DE CONTACTO
                    foreach (@$client['list_phone_contact'] as $valor) {

                        $this->db->insert('tb_client_phone_contact', [
                                'idClientFk'   => $idClientFk,
                                'phoneTag'     => $valor['phoneTag'],
                                'phoneContact' => $valor['phoneContact'],
                            ]
                        );
                    }

                    // OTRA UFC
                    foreach ($client['list_oter_ufc'] as $valor) {

                        $this->db->insert('tb_client_ufc', [
                                'idClientFk'    => $idClientFk,
                                'identificador' => $valor['identificador'],
                                'idProvinceFk'  => $valor['idProvinceFk'],
                                'idTypeTaxFk'   => $valor['idTypeTaxFk'],
                            ]
                        );
                    }


                }

                return 1;
            } else {
                return 0;
            }

        } else {
            return 2;
        }


    }

    public function updateBuilding($client) {

        $this->db->set(
            [
                'name'                    => $client['name'],
                'address'                 => $client['address'],
                'addressLat'              => $client['addressLat'],
                'addressLon'              => $client['addressLon'],
                'idAgentFk'               => $client['idAgentFk'],
                'isNotCliente'            => $client['isNotCliente'],
                'idClientAdminFk'         => $client['idClientAdminFk'],
                'mailFronKey'             => $client['mailFronKey'],
                'observationOrderKey'     => $client['observationOrderKey'],
                'mailServiceTecnic'       => $client['mailServiceTecnic'],
                'observationSericeTecnic' => $client['observationSericeTecnic'],
                'mailCollection'          => $client['mailCollection'],
                'observationCollection'   => $client['observationCollection'],
                'observation'             => $client['observation'],
                'idStatusFk'              => $client['idStatusFk'],
                'idZonaFk'                => @$client['idZonaFk'],
            ]
        )->where("idClient", $client['idClient'])->update("tb_clients");


        $this->db->set(
            [
                'idClientFk'          => $client['idClient'],
                'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                'cuitBilling'         => $client['billing_information']['cuitBilling'],
                'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'] ]
        )->where("idClientFk", $client['idClient'])->update("tb_client_billing_information");


        if (count(@$client['list_schedule_atention']) > 0
            && count(@$client['list_departament']) > 0
            && count(@$client['list_phone_contact']) > 0
            || count(@$client['list_oter_ufc']) > 0
        ) {
            $this->db->delete('tb_client_schedule_atention', [ 'idClienteFk' => $client['idClient'] ]);

            foreach ($client['list_schedule_atention'] as $valor) {

                $this->db->insert('tb_client_schedule_atention', [
                    'idClienteFk' => $client['idClient'],
                    'day'         => $valor['day'],
                    'fronAm'      => $valor['fronAm'],
                    'toAm'        => $valor['toAm'],
                    'fronPm'      => $valor['fronPm'],
                    'toPm'        => $valor['toPm'],
                ]);
            }


            $this->db->delete('tb_client_departament', [ 'idClientFk' => $client['idClient'] ]);

            //  DEPARTAMENTO
            foreach ($client['list_departament'] as $valor) {

                $this->db->insert('tb_client_departament', [
                        'idClientFk'              => $client['idClient'],
                        'floor'                   => $valor['floor'],
                        'departament'             => $valor['departament'],
                        'idCategoryDepartamentFk' => $valor['idCategoryDepartamentFk'],
                        'idStatusFk'              => 1,
                        'numberUNF'               => $valor['numberUNF'],
                    ]
                );
            }
            //  TELEFONOS
            $this->db->delete('tb_client_phone_contact', [ 'idClientFk' => $client['idClient'] ]);

            foreach ($client['list_phone_contact'] as $valor) {

                $this->db->insert('tb_client_phone_contact', [
                    'idClientFk'   => $valor['idClientFk'],
                    'phoneTag'     => $valor['phoneTag'],
                    'phoneContact' => $valor['phoneContact'],
                ]);
            }
            // OTRA UFC
            foreach ($client['list_oter_ufc'] as $valor) {

                $this->db->insert('tb_client_ufc', [
                        'idClientFk'    => $client['idClient'],
                        'identificador' => $valor['identificador'],
                        'idProvinceFk'  => $valor['idProvinceFk'],
                        'idTypeTaxFk'   => $valor['idTypeTaxFk'],
                    ]
                );
            }


            return true;
        }

    }

    // ****************  //


    // EMPRESA //
    public function addCompany($client) {

        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }

        $user = null;

        $this->db->select("*")->from("tb_clients");
        $this->db->where("tb_clients.name =", $client['name']);
        $query = $this->db->where("tb_clients.idClientTypeFk =", $client['idClientTypeFk'])->get();

        if ($query->num_rows() < 1) {


            $this->db->insert('tb_clients', [
                    'idClientTypeFk'          => $client['idClientTypeFk'],
                    'name'                    => $client['name'],
                    'address'                 => $client['address'],
                    'addressLat'              => $client['addressLat'],
                    'addressLon'              => $client['addressLon'],
                    'idAgentFk'               => $client['idAgentFk'],
                    'businessName'            => $client['businessName'],
                    'CUIT'                    => $client['CUIT'],
                    'idStatusFk'              => 1,
                    'idLocationFk'            => $client['idLocationFk'],
                    'idProvinceFk'            => $client['idProvinceFk'],
                    'mailServiceTecnic'       => $client['mailServiceTecnic'],
                    'observationSericeTecnic' => $client['observationSericeTecnic'],
                    'mailCollection'          => $client['mailCollection'],
                    'observationCollection'   => $client['observationCollection'],
                    'pageWeb'                 => $client['pageWeb'],
                    'observation'             => $client['observation'],
                    'idZonaFk'                => @$client['idZonaFk'],
                    'idClientDepartamentFk'   => @$idClientDepartamentFk,
                ]
            );

            if ($this->db->affected_rows() === 1) {
                $idClientFk = $this->db->insert_id();

                // DATOS DE FACTURCION
                $this->db->insert('tb_client_billing_information', [
                        'idClientFk'          => $idClientFk,
                        'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                        'cuitBilling'         => $client['billing_information']['cuitBilling'],
                        'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                        'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                        'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'],
                    ]
                );

                if (count(@$client['list_schedule_atention']) > 0
                    && count(@$client['list_phone_contact']) > 0
                    || count(@$client['list_client_user']) > 0
                    || count(@$client['list_oter_ufc']) > 0
                ) {

                    // HORARIOS
                    foreach ($client['list_schedule_atention'] as $valor) {

                        $this->db->insert('tb_client_schedule_atention', [
                                'idClienteFk' => $idClientFk,
                                'day'         => $valor['day'],
                                'fronAm'      => $valor['fronAm'],
                                'toAm'        => $valor['toAm'],
                                'fronPm'      => $valor['fronPm'],
                                'toPm'        => $valor['toPm'],
                            ]
                        );
                    }
                    //  TELEFONOS DE CONTACTO
                    foreach (@$client['list_phone_contact'] as $valor) {

                        $this->db->insert('tb_client_phone_contact', [
                                'idClientFk'   => $idClientFk,
                                'phoneTag'     => $valor['phoneTag'],
                                'phoneContact' => $valor['phoneContact'],
                            ]
                        );
                    }

                    //  USUARIOS DE LA EMPRESA
                    foreach ($client['list_client_user'] as $valor) {

                        $this->db->insert('tb_client_users', [
                                'idClientFk' => $idClientFk,
                                'idUserFk'   => $valor['idUserFk'],
                            ]
                        );
                    }

                    // OTRA UFC
                    foreach ($client['list_oter_ufc'] as $valor) {

                        $this->db->insert('tb_client_ufc', [
                                'idClientFk'    => $idClientFk,
                                'identificador' => $valor['identificador'],
                                'idProvinceFk'  => $valor['idProvinceFk'],
                                'idTypeTaxFk'   => $valor['idTypeTaxFk'],
                            ]
                        );
                    }


                }

                return 1;
            } else {
                return 0;
            }

        } else {
            return 2;
        }


    }

    public function updateCompany($client) {

        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }


        $this->db->set(
            [
                'name'                    => $client['name'],
                'address'                 => $client['address'],
                'addressLat'              => $client['addressLat'],
                'addressLon'              => $client['addressLon'],
                'idAgentFk'               => $client['idAgentFk'],
                'businessName'            => $client['businessName'],
                'CUIT'                    => $client['CUIT'],
                'idLocationFk'            => $client['idLocationFk'],
                'idProvinceFk'            => $client['idProvinceFk'],
                'mailServiceTecnic'       => $client['mailServiceTecnic'],
                'observationSericeTecnic' => $client['observationSericeTecnic'],
                'mailCollection'          => $client['mailCollection'],
                'observationCollection'   => $client['observationCollection'],
                'pageWeb'                 => $client['pageWeb'],
                'observation'             => $client['observation'],
                'idZonaFk'                => @$client['idZonaFk'],
                'idClientDepartamentFk'   => @$idClientDepartamentFk,
            ]
        )->where("idClient", $client['idClient'])->update("tb_clients");


        $this->db->set(
            [
                'idClientFk'          => $client['idClient'],
                'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                'cuitBilling'         => $client['billing_information']['cuitBilling'],
                'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'] ]
        )->where("idClientFk", $client['idClient'])->update("tb_client_billing_information");


        if (count(@$client['list_schedule_atention']) > 0
            && count(@$client['list_phone_contact']) > 0
            && count(@$client['list_client_user']) > 0
            && count(@$client['list_oter_ufc']) > 0
        ) {
            $this->db->delete('tb_client_schedule_atention', [ 'idClienteFk' => $client['idClient'] ]);

            foreach ($client['list_schedule_atention'] as $valor) {

                $this->db->insert('tb_client_schedule_atention', [
                    'idClienteFk' => $valor['idClienteFk'],
                    'day'         => $valor['day'],
                    'fronAm'      => $valor['fronAm'],
                    'toAm'        => $valor['toAm'],
                    'fronPm'      => $valor['fronPm'],
                    'toPm'        => $valor['toPm'],
                ]);
            }

            $this->db->delete('tb_client_phone_contact', [ 'idClientFk' => $client['idClient'] ]);

            foreach ($client['list_phone_contact'] as $valor) {

                $this->db->insert('tb_client_phone_contact', [
                    'idClientFk'   => $valor['idClientFk'],
                    'phoneTag'     => $valor['phoneTag'],
                    'phoneContact' => $valor['phoneContact'],
                ]);
            }

            $this->db->delete('tb_client_users', [ 'idClientFk' => $client['idClient'] ]);


            foreach ($client['list_client_user'] as $valor) {

                $this->db->insert('tb_client_users', [
                        'idClientFk' => $valor['idClienteFk'],
                        'idUserFk'   => $valor['idUserFk'],
                    ]
                );
            }

            // OTRA UFC
            $this->db->delete('tb_client_ufc', [ 'idClientFk' => $client['idClient'] ]);

            foreach ($client['list_oter_ufc'] as $valor) {

                $this->db->insert('tb_client_ufc', [
                        'idClientFk'    => $client['idClient'],
                        'identificador' => $valor['identificador'],
                        'idProvinceFk'  => $valor['idProvinceFk'],
                        'idTypeTaxFk'   => $valor['idTypeTaxFk'],
                    ]
                );
            }


            return true;
        }

    }

    // ****************  //

    // SUCURSAL //
    public function addBranch($client) {

        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }


        $user = null;

        $this->db->select("*")->from("tb_clients");
        $this->db->where("tb_clients.name =", $client['name']);
        $query = $this->db->where("tb_clients.idClientTypeFk =", $client['idClientTypeFk'])->get();

        if ($query->num_rows() < 1) {


            $this->db->insert('tb_clients', [
                    'idClientTypeFk'          => $client['idClientTypeFk'],
                    'address'                 => $client['address'],
                    'name'                    => $client['name'],
                    'addressLat'              => $client['addressLat'],
                    'addressLon'              => $client['addressLon'],
                    'idLocationFk'            => $client['idLocationFk'],
                    'idProvinceFk'            => $client['idProvinceFk'],
                    'isNotCliente'            => $client['isNotCliente'],
                    'idStatusFk'              => 1,
                    'idClientCompaniFk'       => $client['idClientCompaniFk'],
                    'mailServiceTecnic'       => $client['mailServiceTecnic'],
                    'observationSericeTecnic' => $client['observationSericeTecnic'],
                    'mailCollection'          => $client['mailCollection'],
                    'observationCollection'   => $client['observationCollection'],
                    'observation'             => $client['observation'],
                    'idZonaFk'                => @$client['idZonaFk'],
                    'idClientDepartamentFk'   => @$idClientDepartamentFk,
                ]
            );

            if ($this->db->affected_rows() === 1) {
                $idClientFk = $this->db->insert_id();

                // DATOS DE FACTURCION
                $this->db->insert('tb_client_billing_information', [
                        'idClientFk'          => $idClientFk,
                        'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                        'cuitBilling'         => $client['billing_information']['cuitBilling'],
                        'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                        'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                        'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'],
                    ]
                );

                if (count(@$client['list_schedule_atention']) > 0
                ) {

                    // HORARIOS
                    foreach ($client['list_schedule_atention'] as $valor) {

                        $this->db->insert('tb_client_schedule_atention', [
                                'idClienteFk' => $idClientFk,
                                'day'         => $valor['day'],
                                'fronAm'      => $valor['fronAm'],
                                'toAm'        => $valor['toAm'],
                                'fronPm'      => $valor['fronPm'],
                                'toPm'        => $valor['toPm'],
                            ]
                        );
                    }


                }

                return 1;
            } else {
                return 0;
            }

        } else {
            return 2;
        }


    }

    public function updateBranch($client) {
        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }


        $this->db->set(
            [
                'name'                    => $client['name'],
                'address'                 => $client['address'],
                'addressLat'              => $client['addressLat'],
                'addressLon'              => $client['addressLon'],
                'idLocationFk'            => $client['idLocationFk'],
                'idProvinceFk'            => $client['idProvinceFk'],
                'isNotCliente'            => $client['isNotCliente'],
                'idClientCompaniFk'       => $client['idClientCompaniFk'],
                'mailServiceTecnic'       => $client['mailServiceTecnic'],
                'observationSericeTecnic' => $client['observationSericeTecnic'],
                'mailCollection'          => $client['mailCollection'],
                'observationCollection'   => $client['observationCollection'],
                'observation'             => $client['observation'],
                'idZonaFk'                => @$client['idZonaFk'],
                'idClientDepartamentFk'   => @$idClientDepartamentFk,
            ]
        )->where("idClient", $client['idClient'])->update("tb_clients");


        $this->db->set(
            [
                'idClientFk'          => $client['idClient'],
                'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                'cuitBilling'         => $client['billing_information']['cuitBilling'],
                'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'] ]
        )->where("idClientFk", $client['idClient'])->update("tb_client_billing_information");


        if (count(@$client['list_schedule_atention']) > 0) {
            $this->db->delete('tb_client_schedule_atention', [ 'idClienteFk' => $client['idClient'] ]);

            foreach ($client['list_schedule_atention'] as $valor) {

                $this->db->insert('tb_client_schedule_atention', [
                    'idClienteFk' => $valor['idClienteFk'],
                    'day'         => $valor['day'],
                    'fronAm'      => $valor['fronAm'],
                    'toAm'        => $valor['toAm'],
                    'fronPm'      => $valor['fronPm'],
                    'toPm'        => $valor['toPm'],
                ]);
            }


            return true;
        }

    }

    // ****************  //


    // PARTICULAR //
    public function addParticular($client) {
        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }

        $user = null;

        $this->db->select("*")->from("tb_clients");
        $this->db->where("tb_clients.name =", $client['name']);
        $query = $this->db->where("tb_clients.idClientTypeFk =", $client['idClientTypeFk'])->get();

        if ($query->num_rows() < 1) {


            $this->db->insert('tb_clients', [
                    'idClientTypeFk'        => $client['idClientTypeFk'],
                    'name'                  => $client['name'],
                    'address'               => $client['address'],
                    'addressLat'            => $client['addressLat'],
                    'addressLon'            => $client['addressLon'],
                    'idAgentFk'             => $client['idAgentFk'],
                    'idStatusFk'            => 1,
                    'idLocationFk'          => $client['idLocationFk'],
                    'idProvinceFk'          => $client['idProvinceFk'],
                    'observation'           => $client['observation'],
                    'mailServiceTecnic'     => $client['mailServiceTecnic'],
                    'mobile'                => $client['mobile'],
                    'mailCollection'        => $client['mailCollection'],
                    'idZonaFk'              => @$client['idZonaFk'],
                    'idClientDepartamentFk' => @$idClientDepartamentFk,
                ]
            );

            if ($this->db->affected_rows() === 1) {
                $idClientFk = $this->db->insert_id();

                // DATOS DE FACTURCION
                $this->db->insert('tb_client_billing_information', [
                        'idClientFk'          => $idClientFk,
                        'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                        'cuitBilling'         => $client['billing_information']['cuitBilling'],
                        'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                        'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                        'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'],
                    ]
                );

                if (count(@$client['list_address_particular']) > 0
                    && count(@$client['list_phone_contact']) > 0
                ) {


                    //  TELEFONOS DE CONTACTO
                    foreach (@$client['list_phone_contact'] as $valor) {

                        $this->db->insert('tb_client_phone_contact', [
                                'idClientFk'   => $idClientFk,
                                'phoneContact' => $valor['phoneContact'],
                            ]
                        );
                    }

                    //  USUARIOS DE LA EMPRESA
                    foreach ($client['list_address_particular'] as $valor) {

                        $idClientDepartamentFk = null;
                        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
                            $idClientDepartamentFk = $this->searchAddress($valor['address']);
                            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                                $this->db->insert('tb_clients', [
                                        'idClientTypeFk' => 2,
                                        'name'           => $valor['address'],
                                        'address'        => $valor['address'],
                                        'isNotCliente'   => 1,
                                    ]
                                );
                                $idClientDepartamentFk = $this->db->insert_id();
                            } else {
                                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
                            }
                        }

                        $this->db->insert('tb_client_address_particular', [
                                'idClientFk'    => $idClientFk,
                                'address'       => $valor['address'],
                                'depto'         => $valor['depto'],
                                'isBuilding'    => $valor['isBuilding'],
                                'idProvinceFk'  => $valor['idProvinceFk'],
                                'idLocationFk'  => $valor['idLocationFk'],
                                'clarification' => $valor['clarification'],
                            ]
                        );
                    }


                }

                return 1;
            } else {
                return 0;
            }

        } else {
            return 2;
        }


    }

    public function updateParticular($client) {
        $idClientDepartamentFk = null;
        if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
            $idClientDepartamentFk = $this->searchAddress($client['address']);
            if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                $this->db->insert('tb_clients', [
                        'idClientTypeFk' => 2,
                        'name'           => $client['address'],
                        'address'        => $client['address'],
                        'isNotCliente'   => 1,
                        /*'addressLat'              => $client['addressLat'],
                        'addressLon'              => $client['addressLon'],
                        'idLocationFk'            => $client['idLocationFk'],
                        'idProvinceFk'            => $client['idProvinceFk'],*/
                    ]
                );
                $idClientDepartamentFk = $this->db->insert_id();
            } else {
                $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
            }
        }

        $this->db->set(
            [
                'name'                  => $client['name'],
                'address'               => $client['address'],
                'addressLat'            => $client['addressLat'],
                'addressLon'            => $client['addressLon'],
                'idAgentFk'             => $client['idAgentFk'],
                'idLocationFk'          => $client['idLocationFk'],
                'idProvinceFk'          => $client['idProvinceFk'],
                'observation'           => $client['observation'],
                'mailServiceTecnic'     => $client['mailServiceTecnic'],
                'mobile'                => $client['mobile'],
                'mailCollection'        => $client['mailCollection'],
                'idZonaFk'              => @$client['idZonaFk'],
                'idClientDepartamentFk' => @$idClientDepartamentFk,
            ]
        )->where("idClient", $client['idClient'])->update("tb_clients");


        $this->db->set(
            [
                'idClientFk'          => $client['idClient'],
                'businessNameBilling' => $client['billing_information']['businessNameBilling'],
                'cuitBilling'         => $client['billing_information']['cuitBilling'],
                'idLocationBillingFk' => $client['billing_information']['idLocationBillingFk'],
                'idProvinceBillingFk' => $client['billing_information']['idProvinceBillingFk'],
                'idTypeTaxFk'         => $client['billing_information']['idTypeTaxFk'] ]
        )->where("idClientFk", $client['idClient'])->update("tb_client_billing_information");


        if (count(@$client['list_address_particular']) > 0
            && count(@$client['list_phone_contact']) > 0
        ) {


            $this->db->delete('tb_client_phone_contact', [ 'idClientFk' => $client['idClient'] ]);

            foreach ($client['list_phone_contact'] as $valor) {

                $this->db->insert('tb_client_phone_contact', [
                    'idClientFk'   => $valor['idClientFk'],
                    'phoneContact' => $valor['phoneContact'],
                ]);
            }

            $this->db->delete('tb_client_users', [ 'idClientFk' => $client['idClient'] ]);


            foreach ($client['list_address_particular'] as $valor) {

                $idClientDepartamentFk = null;
                if ($client['idTipoInmuebleFk'] == '1') { //SI EL TIPO DE INMUEBLE ES DEPARTAMENTO
                    $idClientDepartamentFk = $this->searchAddress($valor['address']);
                    if ($idClientDepartamentFk == '0') { //SI NO EXISTE LA DIRECCION
                        $this->db->insert('tb_clients', [
                                'idClientTypeFk' => 2,
                                'name'           => $valor['address'],
                                'address'        => $valor['address'],
                                'isNotCliente'   => 1,
                            ]
                        );
                        $idClientDepartamentFk = $this->db->insert_id();
                    } else {
                        $idClientDepartamentFk = $idClientDepartamentFk[0]['idClient'];
                    }
                }


                $this->db->insert('tb_client_address_particular', [
                        'idClientFk'    => $client['idClient'],
                        'address'       => $valor['address'],
                        'depto'         => $valor['depto'],
                        'isBuilding'    => $valor['isBuilding'],
                        'idProvinceFk'  => $valor['idProvinceFk'],
                        'idLocationFk'  => $valor['idLocationFk'],
                        'clarification' => $valor['clarification'],
                    ]
                );
            }


            return true;
        }

    }

    public function getUserPorId($idClient = null) {
        $quuery = null;
        $rs     = null;

        if (! is_null($idClient)) {


            $this->db->select("*")->from("tb_clients");
            $this->db->join('tb_client_type', 'tb_client_type.idClientType = tb_clients.idClientTypeFk', 'left');
            $quuery = $this->db->where("tb_clients.idClient =", $idClient)->get();


            if ($quuery->num_rows() === 1) {
                $rs = $quuery->row_array();


                $this->db->select("*")->from("tb_client_schedule_atention");
                $quuery = $this->db->where("tb_client_schedule_atention.idClienteFk =", $idClient)->get();

                $rs1                          = $quuery->result_array();
                $rs['list_schedule_atention'] = $rs1;


                $this->db->select("*")->from("tb_client_phone_contact");
                $quuery = $this->db->where("tb_client_phone_contact.idClientFk =", $idClient)->get();

                $rs2                      = $quuery->result_array();
                $rs['list_phone_contact'] = $rs2;


                $this->db->select("*")->from("tb_client_users");
                $this->db->join('tb_user', 'tb_user.idUser = tb_client_users.idUserFk', 'inner');
                $quuery = $this->db->where("tb_client_users.idClientFk =", $idClient)->get();

                $rs3                    = $quuery->result_array();
                $rs['list_client_user'] = $rs3;


                $this->db->select("*")->from("tb_clients");
                $quuery = $this->db->where("tb_clients.idClientAdminFk =", $idClient)->get();

                $rs5                    = $quuery->result_array();
                $rs['sucursales'] = $rs5;

                $this->db->select("*")->from("tb_clients");
                $quuery = $this->db->where("tb_clients.idClientCompaniFk =", $idClient)->get();

                $rs6                    = $quuery->result_array();
                $rs['administraciones'] = $rs6;


                // DATOS DE FACTURCION
                $this->db->select("*")->from("tb_client_billing_information");
                $this->db->join('tb_tax', 'tb_tax.idTypeTax = tb_client_billing_information.idTypeTaxFk', 'inner');
                $this->db->join('tb_location', 'tb_location.idLocation = tb_client_billing_information.idLocationBillingFk', 'inner');
                $this->db->join('tb_province', 'tb_province.idProvince = tb_client_billing_information.idProvinceBillingFk', 'inner');
                $quuery = $this->db->where("tb_client_billing_information.idClientFk =", $idClient)->get();

                $rs4                       = $quuery->result_array();
                $rs['billing_information'] = $rs4;


                return $rs;
            }

            return null;
        }


    }

}

?>
