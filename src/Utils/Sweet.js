import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const fireAlert = setting => {
	Swal.fire({
		title: setting?.title || 'Proceso realizado con exito',
		showConfirmButton: true,
		// showCancelButton: true,
		confirmButtonText: 'OK',
		// cancelButtonText: 'Cancel',
		icon: setting?.icon || 'success',
	}).then(() => {
		// navigate(setting?.path);
		if (setting.path) {
			window.location.href = setting.path;
		}
	});
};
