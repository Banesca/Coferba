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


      // GET DE LISTADO BUSQUEDA DE sucursales de una empresa //
      public function companyByid($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_branch");
            $this->db->join('tb_company', 'tb_company.idCompany = tb_branch.idCompanyKf', 'left');
            $this->db->where("tb_company.idCompany =", $id);


            $quuery = $this->db->order_by("tb_branch.branchName", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }


     public function byidTenant($id) {
        $quuery = null;
        $rs = null;

        $this->db->select("*")->from("tb_addres");
        $this->db->join('tb_department', 'tb_department.idAdressKf = tb_addres.idAdress', 'inner');
        $this->db->group_by('tb_addres.idAdress');
        $quuery =   $this->db->where("tb_department.idTenantKf =", $id)->get();
        

        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }

     
    

}
?>