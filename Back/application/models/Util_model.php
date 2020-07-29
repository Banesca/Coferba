<?php if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Util_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function getClientType() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_client_type")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getAgent() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_agents")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getLocalidad($idProvinceFk) {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_location")
            ->where("tb_location.idProvinceFk =", $idProvinceFk)
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getAllLocalidades() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_location")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getProvincia() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_province")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getTaxtype() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_tax")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getCategoryDepartament() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_category_departament")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getDetinationLicense() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_detination_of_license")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getDepartmentByCustomerId($id) {

        $query = null;
        $rs    = null;
        $select="tb_client_departament.idClientDepartament AS idDepto, 
                    UPPER(CONCAT(tb_client_departament.floor,\"-\",tb_client_departament.departament)) AS Depto,
                    tb_clients.idClient AS idBuilding,
                    tb_clients.name AS Building";
        $where="tb_client_departament.idClientFk=".$id." AND tb_client_departament.idStatusFk<>0";
        $this->db->select($select)->from("tb_client_departament");
        $query = $this->db->join('tb_clients', 'tb_client_departament.idClientFk = tb_clients.idClient', 'left')
            ->where($where)->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }
    public function getTipoInmueble() {

        $query = null;
        $rs    = null;

        $query = $this->db->select("*")->from("tb_tipo_inmueble")
            ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }

    public function getAdressClientEdificio() {

        $query = null;
        $rs    = null;
        $query = $this->db->select("tb_clients.`idClient`, tb_clients.`address`,
              tb_clients.`addressLon`,
              tb_clients.`addressLat`,
              tb_clients.`idLocationFk`,
              tb_clients.`idProvinceFk`,
              tb_location.`location`,
              tb_province.`province`")
            ->from("tb_clients,tb_location,tb_province")
            ->where("tb_clients.idLocationFk = `tb_location`.`idLocation`
              AND tb_clients.idProvinceFk = tb_province.`idProvince`
              AND tb_clients.`idClientTypeFk` = 2")
            ->get();

        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
    }


}

?>