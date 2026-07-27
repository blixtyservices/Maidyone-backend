import { ApiError } from "../../../common/errors";
import AddressRepository from "../repositories/address.repository";
import {
  CreateAddressBody,
  UpdateAddressBody,
} from "../types/address.types";

class AddressService {
  async getAll(userId: string) {
    return AddressRepository.getAll(userId);
  }

  async getById(id: string, userId: string) {
    const address = await AddressRepository.getById(id, userId);

    if (!address) {
      throw new ApiError(404, "Address not found.");
    }

    return address;
  }

  async create(
    userId: string,
    data: CreateAddressBody & { isDefault?: boolean }
  ) {
    const addresses = await AddressRepository.getAll(userId);

    if (addresses.length === 0) {
      data.isDefault = true;
    }

    return AddressRepository.create(userId, data);
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAddressBody & { isDefault?: boolean }
  ) {
    const address = await AddressRepository.getById(id, userId);

    if (!address) {
      throw new ApiError(404, "Address not found.");
    }

    return AddressRepository.update(id, userId, data);
  }

  async delete(id: string, userId: string) {
    const address = await AddressRepository.getById(id, userId);

    if (!address) {
      throw new ApiError(404, "Address not found.");
    }

    await AddressRepository.delete(id, userId);

    if (address.isDefault) {
      const addresses = await AddressRepository.getAll(userId);

      if (addresses.length > 0) {
        await AddressRepository.setDefault(addresses[0].id, userId);
      }
    }

    return {
      message: "Address deleted successfully.",
    };
  }

  async setDefault(id: string, userId: string) {
    const address = await AddressRepository.getById(id, userId);

    if (!address) {
      throw new ApiError(404, "Address not found.");
    }

    return AddressRepository.setDefault(id, userId);
  }

  async getDefault(userId: string) {
    const address = await AddressRepository.getDefault(userId);

    if (!address) {
      throw new ApiError(404, "Default address not found.");
    }

    return address;
  }
}

export default new AddressService();