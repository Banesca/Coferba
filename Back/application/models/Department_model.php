<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Department_model extends CI_Model
{
	
	public function __construct()
	{
        parent::__construct();
         /*MAIL*/ $this->load->model('mail_model');
	}


	 // GET DE LISTADO BUSQUEDA DE INQUIILINO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*")->from("tb_department");
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_department.idAdressKf', 'left');            
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


     // GET DE LISTADO BUSQUEDA DE INQUIILINO //
    public function byIdDireccion($id,$idStatus) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_department");
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_department.idAdressKf', 'left');
            $this->db->where("tb_addres.idAdress =", $id);

            if($idStatus == 1){ // si le mandas 1 te retorna los APROBADOS 
                $this->db->where("tb_department.isAprobatedAdmin =", 1);
            }else if($idStatus == 0){// SI LE MANDAS 0 LOS NO APROBADOS 
                $this->db->where("tb_department.isAprobatedAdmin =", 0);
            }


            $quuery = $this->db->order_by("tb_addres.nameAdress", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }
    //type_keychains
    public function keyChainsByIdAddress($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_company_type_keychains");
            $this->db->where("tb_company_type_keychains.idAddressKf =", $id);
            $quuery = $this->db->order_by("tb_company_type_keychains.idKey", "asc")->get();

            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }
    public function getAllDepartment() {
        $quuery = null;
        $rs = null;

            $quuery = $this->db->select("*")->from("tb_department")->order_by("tb_department.idDepartment", "asc")->get();

            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }
     // GET DE LISTADO DE DEPARTAMENTO POR ID DE DIRECCION, ID DE INQUILINO Y SI ESTA APROBADO //
    public function byIdTenantYDireccion($id, $idT, $idStatus) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_department");
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_department.idAdressKf', 'left');
            $this->db->where("tb_department.idAdressKf =", $id);
            
            if($idStatus == 1){ // si le mandas 1 te retorna los APROBADOS 
                $this->db->where("tb_department.isAprobatedAdmin =", 1);
            }else if($idStatus == 0){// SI LE MANDAS 0 LOS NO APROBADOS 
                $this->db->where("tb_department.isAprobatedAdmin =", 0);
            }
            $this->db->where("tb_department.idUserKf =", $idT);
            $quuery = $this->db->order_by("tb_addres.nameAdress", "asc")->get();
            
            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }


    // VERIFICADOS SI EL DEPARTAMENTO POSEE UN PROPIETARIO //
    public function chekDepartamenteOwner($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_department");
            $this->db->where("tb_department.idDepartment =", $id);
            $quuery =  $this->db->where("tb_department.idUserKf >", 0)->get();

            if ($quuery->num_rows() > 0) {
                return true;
            }
            return false;
        
    }
    
    

    public function aprobated($id) {
        $this->db->set(
                array(
                    'isAprobatedAdmin' => 1 
                )
        )->where("idDepartment", $id)->update("tb_department");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }
    /* AUTORIZAR DEPTO A UN INQUILINO */
    public function deptoTenantStatus($id, $idStatus) {
        $this->db->set(
                array(
                    'isDepartmentApproved' => $idStatus
                )
        )->where("idUser", $id)->update("tb_user");

        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }
    public function desaprobated($id) {
        $this->db->set(
                array(
                    'isAprobatedAdmin' => 0
                )
        )->where("idDepartment", $id)->update("tb_department");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }



    public function requesLowByProp($id) {
        $this->db->set(
                array(
                    'isRequesLowByProp' => 1
                )
        )->where("idDepartment", $id)->update("tb_department");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
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
                    'idUserKf'=>$department['idUserKf']
                    //'idDepartment'=>$department['idDepartment']
                )
        )->where("idDepartment", $department['idDepartment'])->update("tb_department");

        
        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


     /* REMOVER  inquilino */
     public function removeTenant($data) {


        if($data['idTypeTenant'] == 1 ) //PROPIETARO
        {
            $this->db->set(
                array(
                    'idUserKf' => null,
                    'isAprobatedAdmin' => 0
                )
            )
            ->where("idUserKf", $data['idUser'])
            ->where("idDepartment", $data['idDepartmentKf'])
            ->update("tb_department");

            
            if ($this->db->affected_rows() === 1) {

                 /*MAIL*/
                $this->db->select("*")->from("tb_user");
                $this->db->join('tb_department', 'tb_department.idUserKf = tb_user.idUser', 'left');
                $this->db->join('tb_addres', 'tb_addres.idAdress = tb_department.idAdressKf', 'left');
                $this->db->where("idUserKf =", $data['idUser']);
                $query =   $this->db->where("idDepartment", $data['idDepartmentKf'])->get();
                if ($query->num_rows() > 0) {
                    $to = $query->row_array();
                    if($to != ""){
                        $title ="Baja de un Departamento!";
                        $body ="Coferba, Notifica que se le dio de baja el departamento".$to['nameAdress']."!";
                        $this->mail_model->sendMail($title,$to['emailTenant'],$body);
                    }
                }

                return true;
            } else {
                return false;
            }

        }else { // inquilino
            
                $this->db->set(
                    array(
                        'idDepartmentKf' => null,
                        'isDepartmentApproved' => null,
                        'idAddresKf' => null,
                        'idCompanyKf' => null
                    )
                )
                ->where("idUser", $data['idUser'])
                ->where("idDepartmentKf", $data['idDepartmentKf'])
                ->update("tb_user");

                
                if ($this->db->affected_rows() === 1) {

                     /*MAIL*/
                    $this->db->select("*")->from("tb_user");
                    $this->db->join('tb_department', 'tb_department.idDepartment = tb_user.idDepartmentKf', 'left');
                    $this->db->join('tb_addres', 'tb_addres.idAdress = tb_department.idAdressKf', 'left');
                    $this->db->where("idUser =", $data['idUser']);
                    $query =   $this->db->where("idDepartment", $data['idDepartmentKf'])->get();
                    if ($query->num_rows() > 0) {
                        $to = $query->row_array();
                        if($to != ""){
                            $title ="Baja de un Departamento!";
                            $body ="Coferba, Notifica que se le dio de baja el departamento".$to['nameAdress']."!";
                            $this->mail_model->sendMail($title,$to['emailTenant'],$body);
                        }
                    }
                    return true;
                } else {
                    return false;
                }
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