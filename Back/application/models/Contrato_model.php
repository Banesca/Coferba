<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Contrato_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }


    public function add($client) {

        $this->db->insert('tb_contratos', [
                "idClientFk"           => $client['idClientFk'],
                "fechaFirmaVigencia"   => $client['fechaFirmaVigencia'],
                "fechaFirmaActivacion" => $client['fechaFirmaActivacion'],
                "numeroContrato"       => $client['numeroContrato'],
                "contratoType"         => $client['contratoType'],
                "maintenanceType"      => $client['maintenanceType'],
                "idStatusFk"           => $client['idStatusFk'],
            ]
        );
        $idContratoFk = $this->db->insert_id();
        foreach ($client['services'] as $service) {
            $this->db->insert('tb_servicios_del_contrato_cabecera', [
                    "idServiceType" => $service['idServiceType'],
                    "serviceName"   => $service['serviceName'],
                    "idContratoFk"  => $idContratoFk,
                ]
            );
            $idCabecera = $this->db->insert_id();
            if (count($service['serviceItems']) > 0) {
                foreach ($service['serviceItems'] as $serviceItem) {
                    $this->db->insert('tb_servicios_del_contrato_cuerpo', [
                            "qtty"                     => $serviceItem['qtty'],
                            "idAccCrtlDoor"            => $serviceItem['idAccCrtlDoor'],
                            "itemName"                 => $serviceItem['itemName'],
                            "itemAclaracion"           => $serviceItem['itemAclaracion'],
                            "idServiceTypeFk"          => $serviceItem['idServiceTypeFk'],
                            "idServiciosDelContratoFk" => $idCabecera,
                        ]
                    );
                }

            }

        }

        return true;
    }


    public function update($client) {

        $this->db->set([
                "idClientFk"           => $client['idClientFk'],
                "fechaFirmaVigencia"   => $client['fechaFirmaVigencia'],
                "fechaFirmaActivacion" => $client['fechaFirmaActivacion'],
                "numeroContrato"       => $client['numeroContrato'],
                "contratoType"         => $client['contratoType'],
                "maintenanceType"      => $client['maintenanceType'],
                "idStatusFk"           => $client['idStatusFk'],
            ]
        )->where("idContrato", $client['idContrato'])->update("tb_contratos");

        foreach ($client['services'] as $service) {
            $this->db->set([
                    "idServiceType" => $service['idServiceType'],
                    "serviceName"   => $service['serviceName'],
                ]
            )->where("idServiciosDelContrato", $service['idServiciosDelContrato'])->update("tb_servicios_del_contrato_cabecera");

            if (count($service['serviceItems']) > 0) {
                foreach ($service['serviceItems'] as $serviceItem) {
                    $this->db->set([
                            "qtty"            => $serviceItem['qtty'],
                            "idAccCrtlDoor"   => $serviceItem['idAccCrtlDoor'],
                            "itemName"        => $serviceItem['itemName'],
                            "itemAclaracion"  => $serviceItem['itemAclaracion'],
                            "idServiceTypeFk" => $serviceItem['idServiceTypeFk'],
                        ]
                    )->where("idServiciosDelContratoCuerpo", $serviceItem['idServiciosDelContratoCuerpo'])->update("tb_servicios_del_contrato_cuerpo");
                }
            }

        }

        return true;

    }


    public function get() {
        $contratos  = $this->db->select("*")->from("tb_contratos")->get();
        $contratos1 = null;
        if ($contratos->num_rows() > 0) {
            $contratos1 = $contratos->result_array();
            foreach ($contratos->result_array() as $key => $contrato) {
                $cabecera = $this->db->select("*")
                    ->from("tb_servicios_del_contrato_cabecera")
                    ->where('idContratoFk', $contrato['idContrato'])->get();
                if ($cabecera->num_rows() > 0) {
                    //return $contratos;
                    $contratos1[$key]['services'] = $cabecera->result_array();

                    //return $contratos1;
                    foreach ($cabecera->result_array() as $key2 => $cabecera1) {

                        $cuerpo = $this->db->select("*")
                            ->from("tb_servicios_del_contrato_cuerpo")
                            ->where('idServiciosDelContratoFk', $cabecera1['idServiciosDelContrato'])->get();
                        if ($cuerpo->num_rows() > 0) {
                            $contratos1[$key]['services'][$key2]['serviceItems'] = $cuerpo->result_array();
                        }

                    }


                }
            }
        }

        return $contratos1;

    }

    public function getIdClient($idClientFk) {
        $contratos  = $this->db->select("*")
            ->from("tb_contratos")
            ->where('idClientFk', $idClientFk)
            ->get();
        $contratos1 = null;
        if ($contratos->num_rows() > 0) {
            $contratos1 = $contratos->result_array();
            foreach ($contratos->result_array() as $key => $contrato) {
                $r = [
                    "tb_client_services_access_control",
                    "tb_client_services_internet",
                    "tb_client_services_totem", //
                    "tb_client_services_camera", //
                    "tb_client_services_alarms",
                    "tb_client_services_smart_panic",
                ];

                $cabecera = $this->db->select("*")
                    ->from("tb_servicios_del_contrato_cabecera")
                    ->where('idContratoFk', $contrato['idContrato'])->get();
                if ($cabecera->num_rows() > 0) {
                    //return $contratos;
                    $rr                           = $cabecera->result_array();
                    $contratos1[$key]['services'] = $rr;
                    //return $contratos1;
                    foreach ($rr as $key2 => $cabecera1) {
                        //return $rr[0]['idServiceType'];

                        $cuerpo = $this->db->select("*")
                            ->from("tb_servicios_del_contrato_cuerpo")
                            ->where('idServiciosDelContratoFk', $cabecera1['idServiciosDelContrato'])->get();
                        if ($cuerpo->num_rows() > 0) {

                            $servicios = $this->db->select("*")
                                ->from($r[$rr[$key2]['idServiceType'] - 1])
                                ->where('idContracAssociated_SE', $contrato['idContrato'])
                                ->get();
                            $cantidad  = count($cuerpo->result_array());
                            if (count($servicios->result_array()) > 0) {
                                $cantidad = count($cuerpo->result_array()) - count($servicios->result_array());
                            }
                            $contratos1[$key]['services'][$key2]['disponible'] = $cantidad;

                            $contratos1[$key]['services'][$key2]['serviceItems'] = $cuerpo->result_array();
                        }
                    }
                }
            }
        }

        return $contratos1;

    }

    public function getDisponibilidadPorContrato($idContrato, $idServicesType) {
        $contratos  = $this->db->select("*")
            ->from("tb_contratos")
            ->where('idContrato', $idContrato)
            ->get();
        $contratos1 = null;
        if ($contratos->num_rows() > 0) {
            $contratos1 = $contratos->result_array();
            foreach ($contratos->result_array() as $key => $contrato) {
                $r = [
                    "tb_client_services_access_control",
                    "tb_client_services_internet",
                    "tb_client_services_totem", //
                    "tb_client_services_camera", //
                    "tb_client_services_alarms",
                    "tb_client_services_smart_panic",
                ];

                $cabecera = $this->db->select("*")
                    ->from("tb_servicios_del_contrato_cabecera")
                    ->where('idContratoFk', $idContrato)
                    ->where('idServiceType', $idServicesType)
                    ->get();

                if ($cabecera->num_rows() > 0) {
                    //return $contratos;
                    $rr                           = $cabecera->result_array();
                    $contratos1[$key]['services'] = $rr;
                    //return $contratos1;
                    foreach ($rr as $key2 => $cabecera1) {
                        //return $rr[0]['idServiceType'];
                        $cuerpo = $this->db->select("*")
                            ->from("tb_servicios_del_contrato_cuerpo")
                            ->where('idServiciosDelContratoFk', $cabecera1['idServiciosDelContrato'])
                            ->get();


                        if ($cuerpo->num_rows() > 0) {
                            $servicios = $this->db->select("*")
                                ->from($r[$rr[$key2]['idServiceType'] - 1])
                                ->where('idContracAssociated_SE', $contrato['idContrato'])
                                ->get();
                            // return $servicios->result_array();
                            // exit();
                            $cantidad = 0;
                            if ($r[$rr[$key2]['idServiceType'] - 1] == 'tb_client_services_camera') {
                                //return $cuerpo->result_array();
                                //var_dump($r[$rr[$key2]['idServiceType'] - 1]);
                                $er = $servicios->result_array();

                                //exit();
                                if (count($er) > 0) {
                                    foreach ($er as $item1) {
                                        $cantidad += $item1['maxCamera'];
                                    }
                                    $cantidad1 = 0;
                                    $rea       = $cuerpo->result_array();
                                    foreach ($rea as $item1) {
                                        // return $item1['qtty'];
                                        // exit();
                                        $cantidad1 += $item1['qtty'];
                                    }
                                    // return $cantidad;
                                    // exit();
                                    $cantidad = $cantidad1 - $cantidad;
                                }
                            } else {
                                if ($r[$rr[$key2]['idServiceType'] - 1] == 'tb_client_services_totem') {
                                    //return $cuerpo->result_array();
                                    //var_dump($r[$rr[$key2]['idServiceType'] - 1]);
                                    $er = $servicios->result_array();

                                    //exit();
                                    if (count($er) > 0) {
                                        foreach ($er as $item1) {
                                            $cantidad += $item1['maxCamera'];
                                        }
                                        $cantidad1 = 0;
                                        $rea       = $cuerpo->result_array();
                                        foreach ($rea as $item1) {
                                            $cantidad1 += $item1['qtty'];
                                        }
                                        $cantidad = $cantidad1 - $cantidad;
                                    }
                                } else {

                                    $cantidad = count($cuerpo->result_array()) - count($servicios->result_array());
                                }
                            }
                            // if (count($servicios->result_array()) > 0) {
                            //     $cantidad = count($cuerpo->result_array()) - count($servicios->result_array());
                            // }
                            $contratos1[$key]['services'][$key2]['disponible'] = $cantidad;

                            $contratos1[$key]['services'][$key2]['serviceItems'] = $cuerpo->result_array();
                        }
                    }
                }
            }
        }

        return $contratos1;

    }


    public
    function delete($idClient) {

        $this->db->set([ 'idStatusFk' => -1 ])
            ->where("idClient", $idClient)
            ->update("tb_clients");

        return true;

    }


}

?>

