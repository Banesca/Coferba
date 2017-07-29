<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Department_model extends CI_Model
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

            $this->db->select("*")->from("tb_department");
            $this->db->where("tb_department.idStatusKf !=", -1);
            $quuery = $this->db->where("tb_department.idDepartment = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();
                return $rs;
            }
        } 
        else
         { 

            $this->db->select("*")->from("tb_department");
            $this->db->where("tb_department.idStatusKf !=", -1);



            /* Busqueda por filtro */
            if (!is_null($searchFilter['searchFilter'])) 
            {
            	$this->db->like('tb_department.departmentAddress', $searchFilter['searchFilter']);
                $this->db->or_like('tb_department.departmentFloor', $searchFilter['searchFilter']);
                $this->db->or_like('tb_department.deparmentNumber', $searchFilter['searchFilter']);
                $this->db->or_like('tb_department.deparmentDescription', $searchFilter['searchFilter']);
                
            }


            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_department.idDepartment", "DESC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }


	
    /* AGREGRA NUEVO USUARIO EMPRESA */
    public function add($department) {

        /* CREAMOS UN USUARIO PARA ESE CLIENE */
        $this->db->insert('tb_department', array(
        	'departmentAddress' => $department['departmentAddress'],
			'departmentFloor' => $department['departmentFloor'],
			'deparmentNumber' => $department['deparmentNumber'],
			'departmentLat' => $department['departmentLat'],
			'departmentLon' => $department['departmentLon'],
			'deparmentDescription' => $department['deparmentDescription'],
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



     /* EDITAR DATOS DE UN inquilino */
    public function update($department) {

        $this->db->set(
                array(
                    'departmentAddress' => $department['departmentAddress'],
					'departmentFloor' => $department['departmentFloor'],
					'deparmentNumber' => $department['deparmentNumber'],
					'departmentLat' => $department['departmentLat'],
					'departmentLon' => $department['departmentLon'],
					'deparmentDescription' => $department['deparmentDescription']
                )
        )->where("idDepartment", $department['idDepartment'])->update("tb_department");

        
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
        )->where("idDepartment", $id)->update("tb_department");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


}
?>