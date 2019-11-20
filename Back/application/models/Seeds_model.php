<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Seeds_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
    }
    

     public function getModules() {
        $quuery = null;
        $rs = null;

        $quuery =  $this->db->select("*")->from("tb_modules")->get();
        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
	 }
	 
	 public function getProductClassification() {
        $quuery = null;
        $rs = null;

        $quuery =  $this->db->select("*")->from("tb_products_classification")->get();
        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
	 }
	 
	 public function getDiviceOpening() {
        $quuery = null;
        $rs = null;

        $quuery =  $this->db->select("*")->from("tb_divice_opening")->get();
        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }


	 

    

}
?>
