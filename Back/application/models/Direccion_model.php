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
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_branch.idAdressKf', 'left');
            $this->db->where("tb_company.idCompany =", $id);


            $quuery = $this->db->order_by("tb_branch.branchName", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }


     public function byidTenant($id, $idStatus) {
        $quuery = null;
        $rs = null;

        $this->db->select("*")->from("tb_addres");
        $this->db->join('tb_department', 'tb_department.idAdressKf = tb_addres.idAdress', 'inner');
        $this->db->join('tb_branch', 'tb_branch.idAdressKf = tb_department.idAdressKf', 'left');
        $this->db->join('tb_company', 'tb_company.idCompany = tb_branch.idCompanyKf', 'left');
        $this->db->group_by('tb_addres.idAdress');
        
        if($idStatus == 1){ // si le mandas 1 te retorna los APROBADOS 
                $this->db->where("tb_department.isAprobatedAdmin =", 1);
            }else if($idStatus == 0){// SI LE MANDAS 0 LOS NO APROBADOS 
                $this->db->where("tb_department.isAprobatedAdmin =", 0);
            }
        $quuery =   $this->db->where("tb_department.idTenantKf =", $id)->get();
        

        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }

     
    

}
?>