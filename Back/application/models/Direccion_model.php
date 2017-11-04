<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Direccion_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
    }
    

     public function get() {
        $quuery = null;
        $rs = null;

        $quuery =  $this->db->select("*")->from("tb_addres")->get();


        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }


     public function byidTenant($id) {
        $quuery = null;
        $rs = null;

        $this->db->select("*")->from("tb_addres");
        $this->db->join('tb_department', 'tb_department.idAdressKf = tb_addres.idAdress', 'inner');
        $quuery =   $this->db->where("tb_department.idTenantKf =", $id)->get();
        

        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }

     
    

}
?>