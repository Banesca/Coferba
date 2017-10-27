<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tenant_model extends CI_Model
{
	
	public function __construct()
	{
        parent::__construct();
	}


	 // GET DE LISTADO BUSQUEDA DE INQUIILINO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*")->from("tb_tenant");
            $this->db->join('tb_department', 'tb_department.idDepartment = tb_tenant.idDepartmentKf', 'left');
            $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_tenant.idTypeKf', 'left');
			$this->db->where("tb_tenant.idStatusKf !=", -1);
            $quuery = $this->db->where("tb_tenant.idTenant = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();
                return $rs;
            }
        } 
        else
         { 

            $this->db->select("*")->from("tb_tenant");
            $this->db->join('tb_department', 'tb_department.idDepartment = tb_tenant.idDepartmentKf', 'left');
            $this->db->join('tb_typetenant', 'tb_typetenant.idTypeTenant = tb_tenant.idTypeKf', 'left');
			$this->db->where("tb_tenant.idStatusKf !=", -1);

            // Si recibimos id de administrador de cnosorcio  //
            if (@$searchFilter['idAdminR'] > 0) {
                $this->db->where('idDepartmentKf in (
                SELECT  idDepartment  FROM tb_department WHERE idUserAdminRKf = '.$searchFilter['idAdminR'].' )',NULL, FALSE);
            } 

            if(@$searchFilter['idTypeKf'] > 0)
            {
                 $this->db->where('tb_tenant.idTypeKf', $searchFilter['idTypeKf']);
            } 

            /* Busqueda por filtro */
            if (!is_null(@$searchFilter['searchFilter']) && @$searchFilter['searchFilter'] != "") 
            {
            	$this->db->like('tb_tenant.fullNameTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.phoneNumberTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.emailTenant', $searchFilter['searchFilter']);

				
				
				if(@$searchFilter['idDepartmentKf'] > 0)
				{
					 $this->db->or_where('tb_tenant.idDepartmentKf', $searchFilter['idDepartmentKf']);
                }
                
                
            }

            


            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_tenant.idTenant", "DESC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }


	
    /* AGREGRA NUEVO USUARIO EMPRESA */
    public function add($tenant) {

        /* CREAMOS UN USUARIO PARA ESE CLIENE */
        $this->db->insert('tb_tenant', array(
            'fullNameTenant' => $tenant['fullNameTenant'],
            'idTypeKf' => $tenant['idTypeKf'],
            'phoneNumberTenant' => $tenant['phoneNumberTenant'],
            'idDepartmentKf' => $tenant['idDepartmentKf'],
            'emailTenant' => $tenant['emailTenant'],
            'phoneNumberContactTenant' => $tenant['phoneNumberContactTenant'],
            'idStatusKf' => 1
                )
        );

        if ($this->db->affected_rows() === 1) {
            $id = $this->db->insert_id();
            return $id;
        } else {
            return null;
        }
    }


    /* LISTADO DE FILTROS */
    public function getFilterForm() {

        $department = null;
        $profile = null;
        $typetenant = null;


        $query =  $this->db->select("*")->from("tb_department")->get();
        if ($query->num_rows() > 0) {
            $department = $query->result_array();
        }

        $query =  $this->db->select("*")->from("tb_typetenant")->get();
        if ($query->num_rows() > 0) {
            $typetenant = $query->result_array();
        }



        $filter = array(
            'department'  => $department,
            'typetenant' => $typetenant
        );

        return $filter;
    }

    /* LISTADO DE FILTROS */
    public function getTenanatByIdDepartament($id) {
        
                $tenant = null;
        
                $this->db->select("*")->from("tb_tenant");
                $query = $this->db->where("tb_tenant.idDepartmentKf =", $id)->get();
                if ($query->num_rows() > 0) {
                    $tenant = $query->result_array();
                }
    
                $rs = array(
                    'tenant' => $tenant
                );
        
                return $rs;
    }

     /* LISTADO DE FILTROS */
     public function findByEmail($mail) {
        
                $tenant = null;
        
                $this->db->select("*")->from("tb_tenant");
                $query = $this->db->where("tb_tenant.emailTenant =", $mail)->get();
                if ($query->num_rows() > 0) {
                    $tenant = $query->row_array();
                }

                return $tenant;
    }



    

     /* LISTADO DE FILTROS */
     public function getDepartamentByIdAdminR($id) {
        
                $tenant = null;
        
                $this->db->select("*")->from("tb_department");
                $query = $this->db->where("tb_department.idUserAdminRKf =", $id)->get();
                if ($query->num_rows() > 0) {
                    $tenant = $query->result_array();
                }
    
                $rs = array(
                    'tenant' => $tenant
                );
        
                return $rs;
    }
        


     /* EDITAR DATOS DE UN inquilino */
    public function update($tenant) {

        $this->db->set(
                array(
                    'fullNameTenant' => $tenant['fullNameTenant'],
		            'idTypeKf' => $tenant['idTypeKf'],
		            'phoneNumberTenant' => $tenant['phoneNumberTenant'],
		            'idDepartmentKf' => $tenant['idDepartmentKf'],
		            'emailTenant' => $tenant['emailTenant'],
                    'phoneNumberContactTenant' => $tenant['phoneNumberContactTenant']
                )
        )->where("idTenant", $tenant['idTenant'])->update("tb_tenant");

        
        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


     public function changueStatus($id, $idStatus) {
        $this->db->set(
                array(
                    'idStatusKf' => $idStatus
                )
        )->where("idTenant", $id)->update("tb_tenant");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


}
?>