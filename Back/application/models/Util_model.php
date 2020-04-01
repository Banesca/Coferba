<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Util_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
    }
	  

	public function getClientType() {
    
        $query = null;
        $rs = null;

        $query =  $this->db->select("*")->from("tb_client_type")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();          
        }

        return $rs;
	}
	
	public function getAgent() {
    
        $query = null;
        $rs = null;

        $query =  $this->db->select("*")->from("tb_agents")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();          
        }

        return $rs;
    }
		
		
	
	public function getLocalidad($idProvinceFk) {
    
        $query = null;
        $rs = null;

        $query =  $this->db->select("*")->from("tb_location")
        ->where("tb_location.idProvinceFk =", $idProvinceFk)
        ->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();          
        }

        return $rs;
	}
    public function getAllLocalidades() {
    
        $query = null;
        $rs = null;

        $query =  $this->db->select("*")->from("tb_location")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();          
        }

        return $rs;
    }	

	public function getProvincia() {
    
        $query = null;
        $rs = null;

		$query =  $this->db->select("*")->from("tb_province")->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();          
        }

        return $rs;
	}


	public function getTaxtype() {
    
        $query = null;
        $rs = null;

		$query =  $this->db->select("*")->from("tb_tax")
		->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();          
        }

        return $rs;
	}

	public function getCategoryDepartament() {

        $query = null;
        $rs = null;

		$query =  $this->db->select("*")->from("tb_category_departament")
		->get();
        if ($query->num_rows() > 0) {
            $rs = $query->result_array();
        }

        return $rs;
	}

	
	
		
}
?>