<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}

 	public function auth($user)
	{
		
        //echo(sha1(md5($user['userPass'])));
        
        

		/* verificamos el usuario  */
		$this->db->select("*")->from("tb_user");
		$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idUser', 'left');
        $this->db->where("emailUser =",$user['emailUser']);
        $this->db->or_where("fullNameUser =",$user['emailUser']);
		$query = $this->db->where("passwordUser =",sha1(md5($user['passwordUser'])))->get();
		
		if($query->num_rows() == 1){ 

			$user = $query->row_array();
            return $user;
        } 
        else
        {
            return null;
        }
	}


	 // GET DE LISTADO BUSQUEDA DE USUARIO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idUser', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);
            $quuery = $this->db->where("tb_user.idUser = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();
                return $rs;
            }
        } 
        else
         { 

            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idUser', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);

            /* Busqueda por filtro */
            if (!is_null($searchFilter['searchFilter'])) 
            {
            	$this->db->like('tb_user.fullNameUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.emailUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.phoneNumberUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.rezonSocial', $searchFilter['searchFilter']);
            }


            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_user.idUser", "ASC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }



    /* AGRAGR NUEVO USUARIO EMPRESA */
    public function add($user) {

        /* CREAMOS UN USUARIO */
        $this->db->insert('tb_user', array(
            'fullNameUser' => $user['fullNameUser'],
            'emailUser' => $user['emailUser'],
            'phoneNumberUser' => $user['phoneNumberUser'],
            'addresUser' => $user['addresUser'],
            'passwordUser' => sha1(md5($user['passwordUser'])),
            'idProfileKf' => $user['idProfileKf'],
            'rezonSocial' => @$user['rezonSocial'],
            'idStatusKf' => 1
                )
        );

        if ($this->db->affected_rows() === 1) {
            $idUser = $this->db->insert_id();
            return $idUser;
        } else {
            return null;
        }
    }

 

    /* LISTADO DE FILTROS */
    public function getFilterForm() {

       $query = null;
        $profile = null;
        $status = null;
        $type = null;


        $query =  $this->db->select("*")->from("tb_profile")->get();
        if ($query->num_rows() > 0) {
            $profile = $query->result_array();
        }

        $query =  $this->db->select("*")->from("tb_status")->get();
        if ($query->num_rows() > 0) {
            $status = $query->result_array();
        }

         $query =  $this->db->select("*")->from("tb_typetenant")->get();
        if ($query->num_rows() > 0) {
            $type = $query->result_array();
        }



        $filter = array(
            'status'  => $status,
            'profile' => $profile,
            'type' => $type
        );

        return $filter;
    }

    /* EDITAR DATOS DE UN EMPRESA */
    public function update($user) {

        $this->db->set(
                array(
                    'fullNameUser' => $user['fullNameUser'],
                    'emailUser' => $user['emailUser'],
                    'phoneNumberUser' => $user['phoneNumberUser'],
                    'addresUser' => $user['addresUser'],
                    'idProfileKf'=> $user['idProfileKf'],
                    'rezonSocial'=> $user['rezonSocial']
                )
        )->where("idUser", $user['idUser'])->update("tb_user");


        if (@$user['isEditUser']) {

            $this->db->set(
                    array(
                        'passwordUser' => sha1(md5($user['passwordUser']))
                    )
            )->where("idUser", $user['idUser'])->update("tb_user");
        }
        
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
        )->where("idUser", $id)->update("tb_user");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


}
?>		