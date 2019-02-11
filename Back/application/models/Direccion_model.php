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

        
            $this->db->select("*")->from("tb_company");
            $this->db->join('tb_addres', 'tb_addres.idCompanyKf = tb_company.idCompany', 'left');
            $this->db->where("tb_company.idCompany =", $id);


            $quuery = $this->db->order_by("tb_addres.nameAdress", "asc")->get();


            if ($quuery->num_rows() > 0) {
                $query1 =  $this->db->select("*")->from("tb_company_type_keychains")->where("idCompanyKf", $id)->get();
                
                $rs =$quuery->result_array();
                if ($query1->num_rows() > 0) {
                    $companykeychains = $query1->result_array();
                    $rs["companykeychains"] = $companykeychains;
                }
                return $rs;
            }
            return null;
        
    }
          // GET listado de direcciones por el ID de la Empresa //
    public function addressListByCompanyid($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_addres");
            $this->db->join('tb_company', 'tb_company.idCompany = tb_addres.idCompanyKf', 'left');
            $this->db->where("tb_company.idCompany =", $id);


            $quuery = $this->db->order_by("tb_addres.nameAdress", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            } 
                return null;
        
    }
          // Obtener Direccion  por el Codigo de Seguridad //
    public function getTheAddressBySecurityCode($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_addres");
            $this->db->where("tb_addres.IdSecurityCode =", $id);


            $quuery = $this->db->order_by("tb_addres.nameAdress", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            } 
                return null;
        
    }

     public function byidTenant($id, $idDpto, $idStatus) {
        $quuery = null;
        $rs = null;
        $this->db->select("*")->from("tb_addres");
        $this->db->join('tb_department', 'tb_department.idAdressKf = tb_addres.idAdress', 'inner');
        $this->db->join('tb_company', 'tb_company.idCompany = tb_addres.idCompanyKf', 'left');
        if($idDpto){
            $this->db->join('tb_user', 'tb_user.idDepartmentKf = tb_department.idDepartment', 'left');
        }
        $this->db->group_by('tb_addres.idAdress');
        
        if(!$idDpto){
            if($idStatus == 1){ // si le mandas 1 te retorna los APROBADOS 
                    $this->db->where("tb_department.isAprobatedAdmin =", 1);
                }else if($idStatus == 0){// SI LE MANDAS 0 LOS NO APROBADOS 
                    $this->db->where("tb_department.isAprobatedAdmin =", 0);
            }
            $quuery =   $this->db->where("tb_department.idUserKf =", $id)->get();
        }else if($idDpto){
            if($idStatus == 1){ // si le mandas 1 te retorna los APROBADOS 
                    $this->db->where("tb_user.isDepartmentApproved =", 1);
                }else if($idStatus == 0){// SI LE MANDAS 0 LOS NO APROBADOS 
                    $this->db->where("tb_user.isDepartmentApproved =", 0);
            }
            $quuery =   $this->db->where("tb_user.idUser=".$id." and tb_user.idDepartmentKf=".$idDpto)->get();
        }

        if ($quuery->num_rows() > 0) {
            $rs = $quuery->result_array();
            return $rs;
        }
            return null;
     }
    public function checkIfAddressIsInDebt($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_addres");

            $quuery = $this->db->where("tb_addres.IsInDebt=1 AND tb_addres.idAdress=".$id)->get();

            if ($quuery->num_rows() > 0) {
                $rs = $quuery->num_rows();
            }else{
                $rs=0;
            }
            return $rs;
        
    }


}
?>